import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prediction-indicator',
  templateUrl: './prediction-indicator.component.html',
  styleUrls: ['./prediction-indicator.component.scss']
})
export class PredictionIndicatorComponent {
  @Input() value: PlayerAttendancePrediction;
  @Input() showUnknownYet = false;
  @Input() scale: number;

  public cases = PlayerAttendancePrediction;

  constructor() {}
}
