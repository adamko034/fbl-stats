import { PlayerDetailsFantasy } from './player-details-fantasy.model';
import { PlayerDetailsGame } from './player-details-game.model';
import { PlayerDetailsNextOpponent } from './player-details-next-opponent.model';
import { PlayerDetailsTeam } from './player-details-team.model';

export interface PlayerDetails {
  name: string;
  lastName: string;
  position: string;
  team: PlayerDetailsTeam;
  fantasy: PlayerDetailsFantasy;
  games: PlayerDetailsGame[];
  nextOpponent: PlayerDetailsNextOpponent;
}
