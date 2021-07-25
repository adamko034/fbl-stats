import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

export interface LineupPlayer {
  id?: string;
  team?: string;
  name: string;
  lastName: string;
  position: string;
  subPosition: PlayerSubPosition;
}
