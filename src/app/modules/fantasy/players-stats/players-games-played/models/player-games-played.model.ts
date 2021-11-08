import { PlayerCore } from 'src/app/modules/core/players/models/player-core.model';

export interface PlayerGamesPlayed extends PlayerCore {
  gamesPlayed: number;
  gamesPlayedPercentage: number;
  gamesStarted: number;
  gamesStartedPercentage: number;
  allGamesCount: number;
  playedMoreThan70Min: number;
  //playedMoreThan70MinPercentageAll: number;
  playedMoreThan70MinPercentage: number;
}
