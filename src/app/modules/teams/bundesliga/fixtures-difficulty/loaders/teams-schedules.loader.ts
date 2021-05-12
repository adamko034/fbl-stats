import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { TeamsSchedulesDeterminer } from 'src/app/modules/teams/bundesliga/teams-schedules/loaders/strategies/teams-schedules-determiner';
import { TeamsSchedulesState } from 'src/app/modules/teams/bundesliga/teams-schedules/models/teams-schedules.state';
import { PropertiesService } from 'src/app/services/properties.service';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class TeamsSchedulesLoader {
  constructor(private teamsFileStoreService: TeamsStore, private propertiesService: PropertiesService) {}

  public load(teamsSchedulesDeterminer: TeamsSchedulesDeterminer): Observable<TeamsSchedulesState> {
    Logger.logDev('teams schedules loader, loading');
    return this.teamsFileStoreService.selectAll().pipe(
      withLatestFrom(this.propertiesService.selectLastMatchday()),
      filter(([teams]) => !!teams),
      map(([teams, lastMatchday]) => {
        const teamsSchedules = teamsSchedulesDeterminer.get(teams, lastMatchday);

        let mdsHeader = [];
        if (!!teamsSchedules[0]) {
          mdsHeader = Object.keys(teamsSchedules[0].games);
        }

        return { teams: teamsSchedules, mdsHeader };
      }),
      take(1)
    );
  }
}
