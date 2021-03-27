import { MatchdayValue } from 'src/app/shared/models/matchday-value.model';

export interface PlayerFantasyHistory {
  prices: MatchdayValue[];
  popularity: MatchdayValue[];
  leadersPopularity: MatchdayValue[];
}
