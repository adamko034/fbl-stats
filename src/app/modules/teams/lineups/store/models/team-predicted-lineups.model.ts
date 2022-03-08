import { SourcePredictedLineups } from 'src/app/modules/teams/lineups/store/models/source-predicted-lineups.model';

export interface TeamPredictedLineups {
  shortName: string;
  longName: string;
  gameIsPostponed: boolean;
  predictions: SourcePredictedLineups[];
}
