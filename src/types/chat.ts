export interface ChatMessage {
  _id: string;
  roomId: string;
  username: string;
  text: string;
  time: string;
  createdAt: string;
  avatarURL: string;
}

export interface ChatRoom {
  id: string;
  name: string;
}

export enum RoomId {
  GENERAL = 'general',
  CRASH = 'crash',
}

export interface ChatHistoryResponse {
  roomId: string;
  messages: ChatMessage[];
}

export interface ChatError {
  message: string;
}

export interface JoinRoomPayload {
  roomId: RoomId;
}

export interface SendMessagePayload {
  roomId: RoomId;
  message: string;
  username: string;
  userId: string;
}
