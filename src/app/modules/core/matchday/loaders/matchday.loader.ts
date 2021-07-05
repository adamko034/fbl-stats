import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { MatchdayService } from 'src/app/modules/core/matchday/services/matchday.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';

@Injectable({ providedIn: 'root' })
export class MatchdayLoader {
  constructor(
    private teamsStore: TeamsStore,
    private propertiesService: PropertiesStore,
    private matchdayService: MatchdayService
  ) {}

  public loadForNextMatchday(): Observable<Matchday> {
    return combineLatest([this.teamsStore.selectAll(), this.propertiesService.selectLastMatchday()]).pipe(
      filter(([teams, lastMatchday]) => !!teams && teams.length > 0 && !!lastMatchday),
      map(([teams, lastMatchday]) => this.matchdayService.getFor(lastMatchday + 1, teams)),
      first()
    );
  }
}
