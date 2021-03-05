import { OurPicksPlayer } from './our-picks-player.model';

export interface OurPicksPlayers {
  matchday: number;
  players: OurPicksPlayer[];
  published: boolean;
}
