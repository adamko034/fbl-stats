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
  GK = 'gk',
  DEF = 'def',
  MID = 'mid',
  FOR = 'for',
  ALL = 'all'
}
