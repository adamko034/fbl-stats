import { PredictedLineupsSourceAccuracy } from './predicted-lineups-source-accuracy.model';

export interface PredictedLineupsSource {
  order: number;
  name: string;
  displayName: string;
  shortName: string;
  lastUpdated: number;
  published: boolean;
  accuracy: PredictedLineupsSourceAccuracy;
}
