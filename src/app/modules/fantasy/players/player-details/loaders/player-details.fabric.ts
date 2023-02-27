import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetails } from '../models/player-details.model';
import { PlayerDetailsFantasyCreator } from './creators/player-details-fantasy.creator';
import { PlayerDetailsGamesCreator } from './creators/player-details-games.creator';
import { PlayerDetailsNextGameCreator } from './creators/player-details-next-game.creator';
import { PlayerDetailsTeamCreator } from './creators/player-details-team.creator';

@Injectable()
export class PlayerDetailsFabric {
  constructor(
    private fantasyCreator: PlayerDetailsFantasyCreator,
    private teamCreator: PlayerDetailsTeamCreator,
    private gamesCreator: PlayerDetailsGamesCreator,
    private nextOpponentCreator: PlayerDetailsNextGameCreator
  ) {}

  public create(player: Player, teams: { [teamShort: string]: Team }, lastMatchday: number): PlayerDetails {
    const nextOpponent = teams[player.nextGame.opponent];

    return {
      name: player.name,
      lastName: player.lastName,
      position: player.position,
      team: this.teamCreator.from(teams[player.teamShort]),
      fantasy: this.fantasyCreator.from(player),
      games: this.gamesCreator.from(player, teams, lastMatchday),
      nextGame: this.nextOpponentCreator.from(player, nextOpponent),
      fantasyPoints: player.pointsStats
    };
  }
}
