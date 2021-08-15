import { SelectableTeam } from './selectable-team.model';

export interface PlayersFilters {
  position: PlayerPosition;
  price: number;
  matchdays: number;
  popularity: number;
  teams: SelectableTeam[];
  name: string;
  hideUnavailable?: boolean;
  prediction?: PlayersPrediciton;
}

export enum PlayersPrediciton {
  All = -1,
  Benched = 0,
  Varied = 1,
  VariedAndPlay = 2,
  WillPlay = 3
}

export enum PlayerPosition {
  GK = 'gk',
  DEF = 'def',
  MID = 'mid',
  FOR = 'for',
  ALL = 'all'
}
