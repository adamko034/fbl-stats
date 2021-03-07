import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';

export interface AdminOurPicksMatchday {
  ourPicks: OurPicksPlayers;
  bargains: number[];
  mustHave: number[];
  differentials: number[];
  premium: number[];
  surprising: number[];
}
