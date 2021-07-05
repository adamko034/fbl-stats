import { Injectable } from '@angular/core';
import { MatchdayService } from 'src/app/modules/core/matchday/services/matchday.service';
import { PlayerAttendancePredictionService } from 'src/app/modules/core/players/services/player-attendance-prediction.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsNextGame } from '../../models/player-details-next-game.model';
import { PlayerDetailsTeamCreator } from './player-details-team.creator';

@Injectable()
export class PlayerDetailsNextGameCreator {
  constructor(
    private playerDetailsTeamCreator: PlayerDetailsTeamCreator,
    private playerPredictionService: PlayerAttendancePredictionService,
    private matchdayService: MatchdayService
  ) {}

  public from(player: Player, opponent: Team): PlayerDetailsNextGame {
    if (!opponent || !player.nextGame) {
      return null;
    }

    return {
      date: player.nextGame.date,
      isHome: player.nextGame.isHome,
      opponent: this.playerDetailsTeamCreator.from(opponent),
      matchday: player.nextGame.matchday,
      lineupPredictions: player.nextGame.lineupPredictions,
      isSuspensionRisk: player.isSuspensionRisk,
      isUnavailable: player.attendance === 0,
      prediction: this.playerPredictionService.determine(player.nextGame.lineupPredictions),
      isFirstGame: this.matchdayService.isFristGame(player.nextGame.matchday, opponent)
    };
  }
}
