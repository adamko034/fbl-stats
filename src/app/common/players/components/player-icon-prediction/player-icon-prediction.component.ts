import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerPredictionCombined } from '../../models/player-prediction-combined.enum';

@Component({
  selector: 'app-player-icon-prediction',
  templateUrl: './player-icon-prediction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIconPredictionComponent {
  @Input() prediction: PlayerPredictionCombined;

  public cases = PlayerPredictionCombined;
  public scale = 0.7;

  constructor() {}
}
