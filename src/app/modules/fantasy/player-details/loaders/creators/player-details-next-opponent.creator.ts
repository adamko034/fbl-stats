import { Injectable } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { PlayerNextGame } from 'src/app/store/players/models/player-next-game.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsNextOpponent } from '../../models/player-details-next-opponent.model';
import { PlayerDetailsTeamCreator } from './player-details-team.creator';

@Injectable()
export class PlayerDetailsNextOpponentCreator {
  constructor(private playerDetailsTeamCreator: PlayerDetailsTeamCreator, private dateService: DateService) {}

  public from(nextGame: PlayerNextGame, opponent: Team): PlayerDetailsNextOpponent {
    return {
      date: nextGame.date,
      isHome: nextGame.isHome,
      team: this.playerDetailsTeamCreator.from(opponent),
      matchday: nextGame.matchday
    };
  }
}
