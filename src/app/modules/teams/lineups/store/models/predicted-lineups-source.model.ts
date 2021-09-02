import { PredictedLineupsSourceAccuracy } from './predicted-lineups-source-accuracy.model';

export interface PredictedLineupsSource {
  name: string;
  displayName: string;
  lastUpdated: number;
  published: boolean;
  accuracy: PredictedLineupsSourceAccuracy;
}
