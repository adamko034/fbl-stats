import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyState } from '../models/fixtures-difficulty.state';
import { FixturesDifficultyDeterminer } from './strategies/fixtures-difficulty-determiner';

@Injectable()
export class FixturesDifficultyLoader {
  constructor(private teamsFileStoreService: TeamsStore, private propertiesService: PropertiesService) {}

  public load(fixturesDifficultyDeterminer: FixturesDifficultyDeterminer): Observable<FixturesDifficultyState> {
    Logger.logDev('teams schedules loader, loading');
    return this.teamsFileStoreService.selectAll().pipe(
      withLatestFrom(this.propertiesService.selectLastMatchday()),
      filter(([teams]) => !!teams),
      map(([teams, lastMatchday]) => {
        const teamsSchedules = fixturesDifficultyDeterminer.get(teams, lastMatchday);

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
