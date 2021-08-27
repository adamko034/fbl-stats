import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
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

  public isMobile$: Observable<boolean>;

  public get stats(): TextSubtextRow[] {
    return [
      {
        order: 1,
        items: [
          { order: 1, text: `${this.player?.fantasy.popularity.toString()}%`, subtext: 'popularity' },
          { order: 2, text: this.player?.fantasy.totalPoints.toString(), subtext: 'total points' },
          { order: 3, text: this.player?.fantasy.lastMD?.toString() || 'x', subtext: 'last MD' },
          { order: 4, text: this.player?.fantasy.last5?.toString() || 'x', subtext: 'last 5' },
          { order: 5, text: this.player?.fantasy.seasonAvg.toString(), subtext: 'season avg' },
          { order: 6, text: this.player?.fantasy.last5Avg.toString(), subtext: 'last 5 avg' },
          { order: 7, text: this.player?.fantasy.top100Popularity.toString(), subtext: 'leaders %' },
          { order: 8, text: this.player?.fantasy.pointsPer1M.toString(), subtext: 'pts / 1M' }
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
          { order: 1, text: this.player?.fantasy.popularity.toString(), subtext: '%' },
          { order: 2, text: this.player?.fantasy.top100Popularity.toString(), subtext: 'leaders %' },
          { order: 3, text: this.player?.fantasy.lastMD.toString(), subtext: 'last MD' },
          { order: 2, text: this.player?.fantasy.pointsPer1M.toString(), subtext: 'pts/1M' }
        ]
      }
    ];
  }

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }
}
