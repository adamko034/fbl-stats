import { LineupPlayer } from './lineup-player.model';

export interface Lineup {
  goalkeeper: LineupPlayer;
  defenders: LineupPlayer[];
  midfielders: LineupPlayer[];
  forwards: LineupPlayer[];
}
