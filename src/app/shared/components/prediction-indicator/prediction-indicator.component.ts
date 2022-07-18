import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prediction-indicator',
  templateUrl: './prediction-indicator.component.html',
  styleUrls: ['./prediction-indicator.component.scss']
})
export class PredictionIndicatorComponent {
  @Input() value: PlayerPredictionCombined;
  @Input() showUnknownYet = true;
  @Input() scale: number;

  public cases = PlayerPredictionCombined;

  constructor() {}
}
