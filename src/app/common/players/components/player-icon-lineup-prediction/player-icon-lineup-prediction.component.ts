import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerSourceLineupPrediction } from '../../models/player-source-lineup-prediction.enum';

@Component({
  selector: 'app-player-icon-lineup-prediction',
  templateUrl: './player-icon-lineup-prediction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIconLineupPredictionComponent {
  @Input() prediction: PlayerSourceLineupPrediction;

  public cases = PlayerSourceLineupPrediction;
  public scale = 0.7;

  constructor() {}
}
