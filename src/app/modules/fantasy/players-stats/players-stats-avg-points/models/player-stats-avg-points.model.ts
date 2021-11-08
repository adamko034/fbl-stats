import { PlayerCore } from 'src/app/modules/core/players/models/player-core.model';

export interface PlayerStatsAvgPoints extends PlayerCore {
  avgTotal: number;
  totalGamesPoints: number;
  gamesPlayedTotal: number;
  avgHome: number;
  homeGamesPlayed: number;
  homeGamesPoints: number;
  avgAway: number;
  awayGamesPlayed: number;
  awayGamesPoints: number;
  avgVsBottom: number;
  vsBottomGamesPlayed: number;
  vsBottomPoints: number;
  avgVsTop: number;
  vsTopGamesPlayed: number;
  vsTopPoints;
}
