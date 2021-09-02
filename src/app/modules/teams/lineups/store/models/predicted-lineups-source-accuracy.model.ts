import { PredictedLineupsSourceTeamAccuracy } from './predicted-lineups-source-team-accuracy.model';

export interface PredictedLineupsSourceAccuracy {
  avgSeasonAccuracy: number;
  last5Accuracy: number;
  lastMdAccuracy: number;
  teams: PredictedLineupsSourceTeamAccuracy[];
}
