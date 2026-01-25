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
  private crashSocket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(accessToken: string): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

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
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', reason => {
      console.warn('❌ Socket disconnected:', reason);
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
    this.socket?.emit('chat:join', { roomId } as JoinRoomPayload);
  }

  leaveRoom(roomId: RoomId): void {
    this.socket?.emit('chat:leave', { roomId } as JoinRoomPayload);
  }

  sendMessage(payload: SendMessagePayload): void {
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

  connectCrash(): Socket {
    if (this.crashSocket?.connected) {
      return this.crashSocket;
    }

    const baseUrl = API_CONFIG.BASE_URL.replace('/api', '');
    this.crashSocket = io(`${baseUrl}/crash`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.crashSocket.on('connect', () => {
      // console.log('✅ Crash socket connected:', this.crashSocket?.id);
    });

    this.crashSocket.on('disconnect', reason => {
      console.warn('❌ Crash socket disconnected:', reason);
    });

    this.crashSocket.on('connect_error', error => {
      console.error('❌ Crash socket connection error:', error);
    });

    return this.crashSocket;
  }

  subscribeToGame(gameId: string): void {
    this.crashSocket?.emit('subscribe:game', { gameId });
  }

  onGameTick(
    callback: (data: {
      gameId: string;
      multiplier: number;
      elapsed: number;
    }) => void
  ): void {
    this.crashSocket?.on('game:tick', callback);
  }

  onGameCrash(
    callback: (data: {
      gameId: string;
      crashPoint: number;
      serverSeed: string;
      reveal: string;
    }) => void
  ): void {
    this.crashSocket?.on('game:crash', callback);
  }

  offCrashEvents(): void {
    this.crashSocket?.off('game:tick');
    this.crashSocket?.off('game:crash');
  }

  disconnectCrash(): void {
    if (this.crashSocket) {
      this.crashSocket.removeAllListeners();
      this.crashSocket.disconnect();
      this.crashSocket = null;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  isCrashConnected(): boolean {
    return this.crashSocket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  getCrashSocket(): Socket | null {
    return this.crashSocket;
  }
}

export const socketService = new SocketService();
