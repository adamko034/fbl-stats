import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';
import { PlayerSourceLineupPrediction } from 'src/app/common/players/models/player-source-lineup-prediction.enum';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-home-players-varied-predictions',
  templateUrl: './home-players-varied-predictions.component.html',
  styleUrls: ['./home-players-varied-predictions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlayersVariedPredictionsComponent {
  @Input() set players(value: Player[]) {
    this._topVariedPredictions = new ArrayStream(value)
      .filterQuick((p) => p.attendance === 1)
      .filterQuick((p) => this.isVariedPredictions(p))
      .orderBy('top500Popularity', 'dsc')
      .take(6)
      .forEachQuick((player) => {
        player['last4'] = this.getLast4(player);
        player['blDe'] = this.getPrediction(player, 'bundesliga');
        player['blEn'] = this.getPrediction(player, 'bundesliga_en');
        player['kk'] = this.getPrediction(player, 'kicker');
        player['li'] = this.getPrediction(player, 'ligainsider');
        player['bi'] = this.getPrediction(player, 'bulinews');
      })
      .collect();
  }

  private _topVariedPredictions: Player[];
  public get topVariedPredictions(): Player[] {
    return this._topVariedPredictions;
  }

  constructor(private predictionDeterminer: PlayerPredictionCombinedDeterminer, private router: Router) {}

  public onShowMoreClick() {
    this.router.navigate(['teams', 'lineups']);
  }

  private getLast4(player: Player): number {
    return new ArrayStream(player.games)
      .orderBy('matchday', 'dsc')
      .take(4)
      .sumBy((g) => g.points);
  }

  private isVariedPredictions(player: Player): boolean {
    return this.predictionDeterminer.determine(player.nextGame) === PlayerPredictionCombined.DOUBT;
  }

  private getPrediction(player: Player, source: string): PlayerSourceLineupPrediction {
    const predictions = player.nextGame.lineupPredictions.filter((p) => p.source === source);

    if (!predictions || predictions.length === 0) {
      return PlayerSourceLineupPrediction.UNKNOWN;
    }

    return predictions[0].attendance;
  }
}
