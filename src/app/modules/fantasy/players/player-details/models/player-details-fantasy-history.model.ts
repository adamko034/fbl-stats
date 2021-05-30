import { MatchdayValue } from 'src/app/shared/models/matchday-value.model';

export interface PlayerDetailsFantasyHistory {
  prices: MatchdayValue[];
  popularity: MatchdayValue[];
  leadersPopularity: MatchdayValue[];
}
