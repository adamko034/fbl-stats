import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { TextSubtextRow } from 'src/app/shared/components/text-subtext-row/models/text-subtext-row.model';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-main',
  templateUrl: './player-details-main.component.html',
  styleUrls: ['./player-details-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsMainComponent {
  @Input() player: PlayerDetails;

  public predictions = PlayerAttendancePrediction;
  public isMobile$: Observable<boolean>;

  public get stats(): TextSubtextRow[] {
    return [
      {
        order: 1,
        items: [
          { order: 1, text: this.player?.fantasy.totalPoints.toString(), subtext: 'total pts' },
          { order: 2, text: this.player?.fantasy.last5.toString(), subtext: 'last 5 pts' },
          { order: 4, text: this.player?.fantasy.seasonAvg.toString(), subtext: 'season avg pts' },
          { order: 5, text: this.player?.fantasy.last5Avg.toString(), subtext: 'last 5 avg pts' }
        ]
      },
      {
        order: 2,
        items: [
          { order: 1, text: this.player?.fantasy.lastMD.toString(), subtext: 'last MD pts' },
          { order: 2, text: this.player?.fantasy.popularity.toString(), subtext: 'popularity' },
          { order: 3, text: this.player?.fantasy.top100Popularity.toString(), subtext: 'leaders %' },
          { order: 4, text: this.player?.fantasy.pointsPer1M.toString(), subtext: 'pts / 1M' }
        ]
      }
    ];
  }

  public get statsMobile(): TextSubtextRow[] {
    return [
      {
        order: 1,
        items: [
          { order: 1, text: this.player?.fantasy.totalPoints.toString(), subtext: 'total pts' },
          { order: 2, text: this.player?.fantasy.pointsPer1M.toString(), subtext: 'pts / 1M' },
          { order: 3, text: this.player?.fantasy.seasonAvg.toString(), subtext: 'season avg pts' }
        ]
      },
      {
        order: 2,
        items: [
          { order: 1, text: this.player?.fantasy.last5.toString(), subtext: 'last 5 pts' },
          { order: 3, text: this.player?.fantasy.lastMD.toString(), subtext: 'last MD pts' },
          { order: 2, text: this.player?.fantasy.last5Avg.toString(), subtext: 'last 5 avg pts' }
        ]
      },
      {
        order: 3,
        items: [
          { order: 1, text: this.player?.fantasy.popularity.toString(), subtext: '%' },
          { order: 2, text: this.player?.fantasy.top100Popularity.toString(), subtext: 'leaders %' }
        ]
      }
    ];
  }

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }
}
