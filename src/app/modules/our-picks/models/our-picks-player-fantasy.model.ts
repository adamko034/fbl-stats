import { OurPicksPlayerFantasyMatchday } from './our-picks-player-fantasy-matchday.model';

export interface OurPicksPlayerFantasy {
  totalPoints: number;
  popularity: number;
  price: number;
  form: OurPicksPlayerFantasyMatchday[];
}
