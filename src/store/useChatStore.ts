import { create } from 'zustand';
import { socketService } from '@/services/socket.service';
import { tokenStorage } from '@/services/token.service';
import { authFlowService } from '@/services/auth-flow.service';
import {
  ChatMessage,
  ChatRoom,
  RoomId,
  SendMessagePayload,
} from '@/types/chat';

interface ChatState {
  messages: Record<RoomId, ChatMessage[]>;
  rooms: ChatRoom[];
  currentRoom: RoomId;
  isConnected: boolean;
  error: string | null;

  connect: () => Promise<void>;
  disconnect: () => void;
  switchRoom: (roomId: RoomId) => void;
  sendMessage: (text: string) => void;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {
    general: [],
    crash: [],
  },
  rooms: [],
  currentRoom: RoomId.GENERAL,
  isConnected: false,
  error: null,

  connect: async () => {
    const token = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    if (!token || !refreshToken) {
      set({ error: 'No access token. Please log in.' });
      return;
    }

    try {
      const socket = socketService.connect(token);

      const setupListeners = () => {
        const updateConnection = () => {
          set({ isConnected: socketService.isConnected() });
        };

        socket.on('connect', () => {
          updateConnection();

          const currentRoom = get().currentRoom;
          socketService.joinRoom(currentRoom);
        });

        socket.on('disconnect', () => {
          updateConnection();
        });

        socketService.onRoomsList(roomsList => {
          set({ rooms: roomsList });
        });

        socketService.onChatHistory(history => {
          set(state => ({
            messages: {
              ...state.messages,
              [history.roomId]: history.messages,
            },
          }));
        });

        socketService.onMessage(message => {
          set(state => {
            const roomMessages = state.messages[message.roomId as RoomId] || [];
            const exists = roomMessages.some(msg => msg._id === message._id);
            if (exists) return state;

            return {
              messages: {
                ...state.messages,
                [message.roomId]: [...roomMessages, message],
              },
            };
          });
        });

        socketService.onChatError(chatError => {
          set({ error: chatError.message });
        });

        updateConnection();
      };

      socket.once('connect_error', async error => {
        if (
          error.message.includes('Authentication') ||
          error.message.includes('token') ||
          error.message.includes('Invalid')
        ) {
          try {
            const newTokens = await authFlowService.executeRefreshToken();
            authFlowService.handleRefreshSuccess(newTokens);

            socket.disconnect();

            setupListeners();
          } catch (refreshError) {
            console.error('❌ [ChatStore] Token refresh failed:', refreshError);
            set({ error: 'Session expired. Please log in again.' });
            tokenStorage.clearAll();
          }
        }
      });

      setupListeners();
    } catch (error) {
      console.error('❌ [ChatStore] Connection failed:', error);
      set({ error: 'Failed to connect to chat' });
    }
  },

  disconnect: () => {
    const currentRoom = get().currentRoom;
    socketService.leaveRoom(currentRoom);
    socketService.disconnect();
    set({ isConnected: false });
  },

  switchRoom: roomId => {
    const { currentRoom, isConnected } = get();

    if (!isConnected) {
      set({ error: 'Not connected to chat' });
      return;
    }

    if (currentRoom === roomId) return;

    socketService.leaveRoom(currentRoom);
    socketService.joinRoom(roomId);
    set({ currentRoom: roomId });
  },

  sendMessage: text => {
    const { currentRoom, isConnected } = get();
    const userId = tokenStorage.getUserId();
    const username = tokenStorage.getUserName();

    if (!isConnected) {
      set({ error: 'Not connected to chat' });
      return;
    }

    if (!userId || !username) {
      set({ error: 'User info not found' });
      return;
    }

    if (!text.trim()) return;

    const payload: SendMessagePayload = {
      roomId: currentRoom,
      message: text.trim(),
      username,
      userId,
    };

    socketService.sendMessage(payload);
  },

  clearError: () => set({ error: null }),
}));
