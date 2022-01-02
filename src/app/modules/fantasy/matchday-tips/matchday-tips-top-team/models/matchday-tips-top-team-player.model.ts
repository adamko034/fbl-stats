import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

export interface MatchdayTipsTopTeamPlayer {
  id: string;
  name: string;
  lastName: string;
  price: number;
  popularity: number;
  top500Popularity: number;
  points: number;
  teamShort: string;
  position: string;
  subPosition: PlayerSubPosition;
  available: boolean;
}
