import { SelectableTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/selectable-team.model';

export interface PlayersFilters {
  position: PlayerPosition;
  price: number;
  matchdays: number;
  popularity: number;
  teams: SelectableTeam[];
  name: string;
  hideUnavailable: boolean;
  showOnlyReturning: boolean;
}

export enum PlayerPosition {
  GK = 'gk',
  DEF = 'def',
  MID = 'mid',
  FOR = 'for',
  ALL = 'all'
}
