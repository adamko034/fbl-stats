import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayerSourceLineupPrediction } from '../../models/player-source-lineup-prediction.enum';

@Component({
  selector: 'app-players-predicitons-table',
  templateUrl: './players-predicitons-table.component.html',
  styleUrls: ['./players-predicitons-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersPredicitonsTableComponent {
  @Input() players: Player[];

  public getPrediction(player: Player, source: string): PlayerSourceLineupPrediction {
    var predictions = player.nextGame.lineupPredictions.filter((l) => l.source === source);

    if (!predictions || predictions.length === 0) {
      return PlayerSourceLineupPrediction.UNKNOWN;
    }

    return predictions[0].attendance;
  }
}
