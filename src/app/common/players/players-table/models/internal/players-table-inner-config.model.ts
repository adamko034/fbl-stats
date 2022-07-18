import { FromTo } from 'src/app/shared/models/from-to.model';

export interface PlayersTableInnerConfig {
  matchdays: FromTo;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  showMyTeamButtons: boolean;
  showNextGame: boolean;
  showPrediction: boolean;
  myTeamPlayersIds?: string[];
}
