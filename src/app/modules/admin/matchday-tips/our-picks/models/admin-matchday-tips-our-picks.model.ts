import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';

export interface AdminMatchdayTipsOurPicksMatchday {
  ourPicks: MatchdayTipsOurPicksPlayers;
  bargains: number[];
  mustHave: number[];
  differentials: number[];
  premium: number[];
  surprising: number[];
}
