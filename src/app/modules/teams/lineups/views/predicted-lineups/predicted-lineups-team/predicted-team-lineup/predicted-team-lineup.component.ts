import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SourcePredictedLineups } from 'src/app/modules/teams/lineups/store/models/source-predicted-lineups.model';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-predicted-team-lineup',
  templateUrl: './predicted-team-lineup.component.html',
  styleUrls: ['./predicted-team-lineup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedTeamLineupComponent implements OnInit {
  @Input() sourceLineup: SourcePredictedLineups;

  public shouldScale$: Observable<boolean>;

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.shouldScale$ = this.screenSizeService.onResize().pipe(map((screenSize) => screenSize === ScreenSize.XXS));
  }
}
