import { MatchdayTipOurPick } from './matchday-tips-our-pick.model';

export interface MatchdayTipsOurPick {
  players: MatchdayTipOurPick[];
  differentials?: number[];
  bargains?: number[];
  mustHave?: number[];
  premium?: number[];
  suprising?: number[];
  published: boolean;
  matchday: number;
}
