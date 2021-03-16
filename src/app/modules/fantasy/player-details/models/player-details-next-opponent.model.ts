import { PlayerDetailsTeam } from './player-details-team.model';

export interface PlayerDetailsNextOpponent {
  isHome: boolean;
  date: number;
  team: PlayerDetailsTeam;
  matchday: number;
}
