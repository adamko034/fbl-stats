import { TeamProperty } from 'src/app/models/properties.model';

export interface PlayersFilters {
  position: PlayerPosition;
  price: number;
  matchdays: number;
  popularity: number;
  teams: TeamProperty[];
  name: string;
  hideUnavailable: boolean;
}

export enum PlayerPosition {
  GK = 'goalkeepers',
  DEF = 'defenders',
  MID = 'midfielders',
  FOR = 'forwards'
}
