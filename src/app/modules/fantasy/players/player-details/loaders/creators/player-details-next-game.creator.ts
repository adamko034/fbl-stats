import { Injectable } from '@angular/core';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsNextGame } from '../../models/player-details-next-game.model';
import { PlayerDetailsTeamCreator } from './player-details-team.creator';

@Injectable()
export class PlayerDetailsNextGameCreator {
  constructor(
    private playerDetailsTeamCreator: PlayerDetailsTeamCreator,
    private predictionCombinedDeterminer: PlayerPredictionCombinedDeterminer
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
      isPostponed: player.nextGame.isPostponed,
      prediction: this.predictionCombinedDeterminer.determine(player.nextGame),
      isFirstGame: opponent.games?.find((g) => g.matchday === player.nextGame.matchday)?.isMatchdayFirstGame || false
    };
  }
}
