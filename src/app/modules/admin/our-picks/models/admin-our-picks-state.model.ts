import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';

export interface AdminOurPicksState {
  ourPicks: OurPicksPlayers;
  bargains: number[];
  mustHave: number[];
  differentials: number[];
  premium: number[];
}
