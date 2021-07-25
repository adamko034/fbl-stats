import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { MatchdayFirstGames } from 'src/app/modules/core/matchday/models/matchday-first-games.model';
import { MatchdayService } from 'src/app/modules/core/matchday/services/matchday.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class NextMatchdaysFirstGamesLoader {
  constructor(
    private propertiesService: PropertiesStore,
    private teamsStore: TeamsStore,
    private matchdayService: MatchdayService
  ) {}

  public load(): Observable<MatchdayFirstGames[]> {
    Logger.logDev('next matchdays first games loader, loading');
    return combineLatest([this.propertiesService.selectLastMatchday(), this.teamsStore.selectAll()]).pipe(
      filter(([lastMatchday, teams]) => lastMatchday >= 0 && !!teams && teams.length > 0),
      map(([lastMatchday, teams]) => this.matchdayService.getMatchdaysFirstGames(teams, lastMatchday + 1)),
      first()
    );
  }
}
