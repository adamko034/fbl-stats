import { MatchdayTipsOurPicksPlayer } from './matchday-tips-our-picks-player.model';

export interface MatchdayTipsOurPicksPlayers {
  matchday: number;
  players: MatchdayTipsOurPicksPlayer[];
  published: boolean;
}
