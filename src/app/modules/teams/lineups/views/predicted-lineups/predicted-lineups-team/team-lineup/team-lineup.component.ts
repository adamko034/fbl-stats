import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredictedLineupPlayer } from 'src/app/modules/teams/lineups/store/models/predicted-lineup-player.model';
import { SourcePredictedLineups } from 'src/app/modules/teams/lineups/store/models/source-predicted-lineups.model';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

@Component({
  selector: 'app-team-lineup',
  templateUrl: './team-lineup.component.html',
  styleUrls: ['./team-lineup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamLineupComponent implements OnInit {
  @Input() lineup: SourcePredictedLineups;

  public shouldScale$: Observable<boolean>;

  public get goalkeeper(): string {
    return this.lineup?.goalkeeper?.lastName || '';
  }

  public get goalkeeperId(): string {
    return this.lineup?.goalkeeper?.id;
  }

  public get defenders(): PredictedLineupPlayer[] {
    return this.lineup?.defenders || [];
  }

  public get midfielders(): PredictedLineupPlayer[] {
    return this.lineup?.midfielders || [];
  }

  public get forwards(): PredictedLineupPlayer[] {
    return this.lineup?.forwards || [];
  }

  public getWingers(players: PredictedLineupPlayer[]): PredictedLineupPlayer[] {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Left || p.subPosition === PlayerSubPosition.Right);
  }

  public isMoreThanFourCentrals(players: PredictedLineupPlayer[]): boolean {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Center).length > 4;
  }

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.shouldScale$ = this.screenSizeService.onResize().pipe(map((screenSize) => screenSize === ScreenSize.XXS));
  }
}
