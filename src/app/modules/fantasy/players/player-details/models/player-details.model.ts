import { PlayerPointsStats } from 'src/app/store/players/models/player-points-stats.model';
import { PlayerDetailsFantasy } from './player-details-fantasy.model';
import { PlayerDetailsGame } from './player-details-game.model';
import { PlayerDetailsNextGame } from './player-details-next-game.model';
import { PlayerDetailsTeam } from './player-details-team.model';

export interface PlayerDetails {
  name: string;
  lastName: string;
  position: string;
  team: PlayerDetailsTeam;
  fantasy: PlayerDetailsFantasy;
  games: PlayerDetailsGame[];
  nextGame: PlayerDetailsNextGame;
  fantasyPoints: PlayerPointsStats;
}
