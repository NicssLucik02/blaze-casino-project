import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/config/constants';
import {
  ChatMessage,
  ChatRoom,
  ChatHistoryResponse,
  ChatError,
  JoinRoomPayload,
  SendMessagePayload,
  RoomId,
} from '@/types/chat';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(accessToken: string): Socket {
    if (this.socket?.connected) {
      console.log('✅ Socket already connected');
      return this.socket;
    }

    console.log('🔌 Connecting to socket server...');

    this.socket = io(API_CONFIG.BASE_URL.replace('/api', ''), {
      auth: {
        token: accessToken,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.setupListeners();

    return this.socket;
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', reason => {
      console.log('❌ Socket disconnected:', reason);
    });

    this.socket.on('connect_error', error => {
      console.error('❌ Socket connection error:', error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('chat:error', (error: ChatError) => {
      console.error('❌ Chat error:', error.message);
    });
  }

  onRoomsList(callback: (rooms: ChatRoom[]) => void): void {
    this.socket?.on('chat:rooms', callback);
  }

  joinRoom(roomId: RoomId): void {
    console.log('🚪 Joining room:', roomId);
    this.socket?.emit('chat:join', { roomId } as JoinRoomPayload);
  }

  leaveRoom(roomId: RoomId): void {
    console.log('🚪 Leaving room:', roomId);
    this.socket?.emit('chat:leave', { roomId } as JoinRoomPayload);
  }

  sendMessage(payload: SendMessagePayload): void {
    console.log('📤 Sending message:', payload);
    this.socket?.emit('chat:message', payload);
  }

  onChatHistory(callback: (history: ChatHistoryResponse) => void): void {
    this.socket?.on('chat:history', callback);
  }

  onMessage(callback: (message: ChatMessage) => void): void {
    this.socket?.on('message', callback);
  }

  onChatError(callback: (error: ChatError) => void): void {
    this.socket?.on('chat:error', callback);
  }

  disconnect(): void {
    console.log('🔌 Disconnecting socket...');
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
