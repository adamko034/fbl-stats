import { OurPick } from './our-pick.model';

export interface OurPicks {
  players: OurPick[];
  differentials?: number[];
  bargains?: number[];
  mustHave?: number[];
  premium?: number[];
  suprising?: number[];
  published: boolean;
  matchday: number;
}
