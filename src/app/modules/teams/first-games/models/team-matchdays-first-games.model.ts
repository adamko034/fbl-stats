export interface TeamMatchdaysFirstGames {
  teamShort: string;
  teamLong: string;
  games: { matchday: number; wasPlayed: boolean }[];
  firstGamesCount: number;
  firstGamesPlayedCount: number;
}
