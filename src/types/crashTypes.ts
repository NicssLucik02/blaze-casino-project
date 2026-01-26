export interface CrashBetRequest {
  amount: number;
  autoCashout?: number;
}

export interface CrashBetResponse {
  betId: string;
  amount: number;
  gameId: string;
}

export interface CrashCashoutRequest {
  betId: string;
}

export interface CrashCashoutResponse {
  multiplier: number;
  winAmount: number;
}

export const enum CrashGameStatus {
  WAITING = 'waiting',
  RUNNING = 'running',
  CRASHED = 'crashed',
}

export interface MyBet {
  betId: string;
  amount: number;
}

export interface CrashCurrentGameResponse {
  gameId: string;
  state: CrashGameStatus;
  multiplier?: number;
  serverSeedHash: string;
  myBet?: MyBet;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface CrashGameHistoryItem {
  gameId: string;
  crashPoint: number;
  hash: string;
  seed: string;
}

export interface CrashGameHistoryResponse {
  games: CrashGameHistoryItem[];
}

export interface CrashBetHistoryItem {
  betId: string;
  gameId: string;
  amount: number;
  cashoutMultiplier?: number;
  winAmount?: number;
  status: 'won' | 'lost';
  crashPoint: number;
  createdAt: string;
}

export interface CrashBetHistoryResponse {
  bets: CrashBetHistoryItem[];
}

export interface HistoryQueryParams {
  limit?: number;
  offset?: number;
}

export const enum CrashBetResult {
  WON = 'won',
  LOST = 'lost',
}
