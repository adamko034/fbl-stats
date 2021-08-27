export interface PlayerGamesPlayed {
  id: string;
  name: string;
  lastName: string;
  position: string;
  popularity: number;
  price: number;
  totalPoints: number;
  teamShort: string;
  gamesPlayed: number;
  gamesPlayedPercentage: number;
  gamesStarted: number;
  gamesStartedPercentage: number;
  allGamesCount: number;
  playedMoreThan70Min: number;
  playedMoreThan70MinPercentageAll: number;
  playedMoreThan70MinPercentagePlayed: number;
}
