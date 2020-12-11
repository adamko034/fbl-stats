import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SchedulesService } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/components/player-schedules/services/schedules.service';
import { PlayerDetailsLoadingService } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/services/player-details-loading.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { Player } from 'src/app/store/players/models/player.model';
import { TeamsStoreService } from 'src/app/store/teams/teams-store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-schedules',
  templateUrl: './player-schedules.component.html',
  styleUrls: ['./player-schedules.component.scss']
})
export class PlayerSchedulesComponent implements OnInit, OnDestroy {
  @Input() player: Player;

  private destroyed$ = new Subject<void>();

  public timelineItems: TimelineItem[] = [];

  constructor(
    private schedulesService: SchedulesService,
    private propertiesService: PropertiesService,
    private teamsStoreService: TeamsStoreService,
    private changeDetector: ChangeDetectorRef,
    private loadingService: PlayerDetailsLoadingService
  ) {}

  public ngOnInit(): void {
    this.loadingService.startLoading('schedules');
    Logger.logDev('player schedules component, ' + this.player.name + ' on init');
    combineLatest([this.propertiesService.selectLastMatchday(), this.teamsStoreService.select(this.player.teamShort)])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([lastMatchday, team]) => {
        if (!!lastMatchday && !!team) {
          Logger.logDev('player schedules component, ' + this.player.name + ' subscription, got team');
          this.timelineItems = this.schedulesService.toTimelineItems(team.games, lastMatchday);
          this.changeDetector.detectChanges();
        }

        this.loadingService.endLoading('schedules');
      });
  }

  public ngOnDestroy(): void {
    Logger.logDev('player schedules component, on destroy');
    this.destroyed$.next();
  }
}
