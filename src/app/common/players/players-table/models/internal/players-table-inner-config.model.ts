import { FromTo } from 'src/app/shared/models/from-to.model';

export interface PlayersTableInnerConfig {
  matchdays: FromTo;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  showMyTeamButtons: boolean;
  showNextGame: boolean;
  showPrediction: boolean;
  showTop100Popularity: boolean;
  showTop500Popularity: boolean;
  showGamesStarted: boolean;
  showFormGamesStarted: boolean;
  showGames70Minutes: boolean;
  showFormGames70Minutes: boolean;
  myTeamPlayersIds?: string[];
  showAddOurPicks: boolean;
}
