import { PredictedLineupsSource } from 'src/app/modules/teams/lineups/store/models/predicted-lineups-source.model';
import { TeamPredictedLineups } from 'src/app/modules/teams/lineups/store/models/team-predicted-lineups.model';

export interface PredictedLineupsState {
  teams: TeamPredictedLineups[];
  sources: PredictedLineupsSource[];
}
