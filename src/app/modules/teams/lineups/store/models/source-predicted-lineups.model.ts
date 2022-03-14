import { Lineup } from 'src/app/shared/components/team-lineup/models/lineup.model';

export interface SourcePredictedLineups {
  order: number;
  sourceName: string;
  sourceUrl: string;
  lastUpdated: number;
  lineup: Lineup;
}
