import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerAttendancePrediction } from 'src/app/layout/content/components/players-table-container/models/player-attendance-prediction.enum';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { LineupsSource } from 'src/app/models/properties.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-next-match-predictions',
  templateUrl: './player-next-match-predictions.component.html',
  styleUrls: ['./player-next-match-predictions.component.scss']
})
export class PlayerNextMatchPredictionsComponent implements OnInit {
  @Input() player: PlayerUi;

  public sources = LineupsSource;

  constructor() {}

  ngOnInit(): void {
    Logger.logDev('player next match predictions component, on init');
  }

  public getPrediction(source: string): PlayerAttendancePrediction {
    return this.player.nextGame.lineupPredictions.find((l) => l.source.toLowerCase() === source).attendance;
  }
}
