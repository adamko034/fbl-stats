import { SourcePredictedLineups } from 'src/app/modules/lineups/store/models/source-predicted-lineups.model';

export interface TeamPredictedLineups {
  shortName: string;
  longName: string;
  predictions: SourcePredictedLineups[];
}
