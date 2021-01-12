import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamsSchedulesState } from 'src/app/modules/core/teams/schedules/models/teams-schedules.state';
import { Logger } from 'src/app/utils/logger';

@UntilDestroy()
@Component({
  selector: 'app-teams-schedules',
  templateUrl: './teams-schedules.component.html',
  styleUrls: ['./teams-schedules.component.scss']
})
export class TeamsSchedulesComponent implements OnInit {
  public state$: Observable<TeamsSchedulesState>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    Logger.logDev('teams schedules component, ng on init');
    this.state$ = this.route.data.pipe(
      map((data) => {
        Logger.logDev('tams schedules component, got state ' + data.state?.teams?.length);
        return data.state;
      })
    );
  }
}
