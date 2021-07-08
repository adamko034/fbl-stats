import { SelectableTeam } from './selectable-team.model';

export interface PlayersFilters {
  position: PlayerPosition;
  price: number;
  matchdays: number;
  popularity: number;
  teams: SelectableTeam[];
  name: string;
}

export enum PlayerPosition {
  GK = 'gk',
  DEF = 'def',
  MID = 'mid',
  FOR = 'for',
  ALL = 'all'
}
