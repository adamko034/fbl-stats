import { PlayerPointsStats } from 'src/app/store/players/models/player-points-stats.model';

export interface PlayersStatsPointsPlayer {
  id: string;
  name: string;
  lastName: string;
  teamShort: string;
  position: string;
  price: number;
  points: PlayerPointsStats;
}
