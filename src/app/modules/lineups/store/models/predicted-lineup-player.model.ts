import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

export interface PredictedLineupPlayer {
  id: string;
  name: string;
  lastName: string;
  position: string;
  subPosition: PlayerSubPosition;
}
