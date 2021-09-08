import { MatchdayValue } from 'src/app/shared/models/matchday-value.model';
import { PredictedLineupsSourceTeamAccuracy } from './predicted-lineups-source-team-accuracy.model';

export interface PredictedLineupsSourceAccuracy {
  avgSeasonAccuracy: number;
  last5Accuracy: number;
  lastMdAccuracy: number;
  matchdays: MatchdayValue[];
  teams: PredictedLineupsSourceTeamAccuracy[];
}
