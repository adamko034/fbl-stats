import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetails } from '../models/player-details.model';
import { PlayerDetailsFantasyCreator } from './creators/player-details-fantasy.creator';
import { PlayerDetailsGamesCreator } from './creators/player-details-games.creator';
import { PlayerDetailsNextOpponentCreator } from './creators/player-details-next-opponent.creator';
import { PlayerDetailsTeamCreator } from './creators/player-details-team.creator';

@Injectable()
export class PlayerDetailsFabric {
  constructor(
    private fantasyCreator: PlayerDetailsFantasyCreator,
    private teamCreator: PlayerDetailsTeamCreator,
    private gamesCreator: PlayerDetailsGamesCreator,
    private nextOpponentCreator: PlayerDetailsNextOpponentCreator
  ) {}

  public create(player: Player, team: Team, opponent: Team): PlayerDetails {
    return {
      name: player.name,
      lastName: player.lastName,
      position: player.position,
      team: this.teamCreator.from(team),
      fantasy: this.fantasyCreator.from(player),
      games: this.gamesCreator.from(player, team),
      nextOpponent: this.nextOpponentCreator.from(player.nextGame, opponent)
    };
  }
}
