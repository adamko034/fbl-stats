import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

export interface BundesligaFixtureDetailsState {
  homeTeam: Team;
  homeTeamPlayers: Player[];
  awayTeam: Team;
  awayTeamPlayers: Player[];
  matchday: number;
  isNextMatchday: boolean;
}
