import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerAttendancePrediction } from 'src/app/layout/content/components/players-table-container/models/player-attendance-prediction.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prediction-indicator',
  templateUrl: './prediction-indicator.component.html',
  styleUrls: ['./prediction-indicator.component.scss']
})
export class PredictionIndicatorComponent {
  @Input() value: PlayerAttendancePrediction;
  @Input() height: number;

  public cases = PlayerAttendancePrediction;

  constructor() {}
}
