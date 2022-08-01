import { FromTo } from 'src/app/shared/models/from-to.model';

export interface TeamsKickoffTimesFilters {
  matchdays: FromTo;
  teams: string[];
}
