import { MatchdayValue } from 'src/app/shared/models/matchday-value.model';

export interface PlayerDetailsFantasyHistory {
  prices: MatchdayValue[];
  popularity: MatchdayValue[];
  top100Popularity: MatchdayValue[];
  top500Popularity: MatchdayValue[];
}
