import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

export interface PredictedLineupPlayer {
  name: string;
  lastName: string;
  position: string;
  subPosition: PlayerSubPosition;
}
