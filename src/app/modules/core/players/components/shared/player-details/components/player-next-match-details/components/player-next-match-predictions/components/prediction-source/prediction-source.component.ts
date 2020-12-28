import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LineupsSource } from 'src/app/models/properties.model';
import { LineupsTeamSourceUrl } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/models/lineups-team-source-url.model';
import { LineupsTeamSourceUrlService } from 'src/app/modules/core/players/components/shared/player-details/services/lineups-team-source-url.service';
import { PlayerDetailsLoadingService } from 'src/app/modules/core/players/components/shared/player-details/services/player-details-loading.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-prediction-source',
  templateUrl: './prediction-source.component.html',
  styleUrls: ['./prediction-source.component.scss']
})
export class PredictionSourceComponent implements OnInit, OnDestroy {
  @Input() source: LineupsSource;
  @Input() teamShort: string;

  public source$: Observable<LineupsTeamSourceUrl>;

  constructor(
    private lineupsTeamSourceService: LineupsTeamSourceUrlService,
    private loadingService: PlayerDetailsLoadingService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('prediction source component, on init');
    this.loadingService.startLoading('lineups');
    this.source$ = this.lineupsTeamSourceService.select(this.source, this.teamShort).pipe(
      filter((sourceProperty) => !!sourceProperty),
      tap(() => this.loadingService.endLoading('lineups'))
    );
  }

  public ngOnDestroy(): void {
    this.lineupsTeamSourceService.close();
  }
}
