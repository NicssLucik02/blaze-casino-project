export interface LeaderboardPlayer {
  rank: number;
  username: string;
  totalWagered: number;
  gamesPlayed: number;
  winRate: number;
}

export interface LeaderboardResponse {
  players: LeaderboardPlayer[];
  currentUser: LeaderboardPlayer | null;
}

export const enum LeaderboardPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ALL = 'all',
}
