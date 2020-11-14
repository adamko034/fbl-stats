import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { SchedulesService } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/components/player-schedules/services/schedules.service';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { Player } from 'src/app/models/player.model';
import { PropertiesService } from 'src/app/services/properties.service';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';
import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { SchedulesStoreService } from 'src/app/store/schedules/schedules-store.service';

@Component({
  selector: 'app-player-schedules',
  templateUrl: './player-schedules.component.html',
  styleUrls: ['./player-schedules.component.scss']
})
export class PlayerSchedulesComponent implements OnDestroy, OnInit {
  @Input() player: Player;
  @Input() timelineOptions: TimelineDisplayOptions;

  private destroyed$ = new Subject<void>();

  public timelineItems: TimelineItem[] = [];
  public showTimeline = false;

  constructor(
    private schedulesStoreService: SchedulesStoreService,
    private propertiesService: PropertiesService,
    private schedulesService: SchedulesService,
    private expandedPlayersService: ExpandedPlayersService
  ) {}

  public ngOnInit() {
    this.expandedPlayersService
      .selectPlayerExpanded(this.player.id)
      .pipe(
        mergeMap((expanded) => {
          if (expanded) {
            this.showTimeline = true;
            return this.schedulesStoreService.select(this.player.teamShort);
          }

          return of(null);
        }),
        withLatestFrom(this.propertiesService.selectLastMatchday()),
        takeUntil(this.destroyed$)
      )
      .subscribe(([teamSchedule, lastMatchday]) => {
        if (!!teamSchedule) {
          this.timelineItems = this.schedulesService.toTimelineItems(teamSchedule, lastMatchday);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
