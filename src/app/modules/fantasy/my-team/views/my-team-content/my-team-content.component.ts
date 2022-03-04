import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { FixturesStore } from 'src/app/store/fixtures/fixtures.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { MyTeamState } from '../../models/my-team-state.model';
import { MyTeamPlayersFitlersService } from '../../services/my-team-players-filters.service';
import { MyTeamTilesDisplaySettingsService } from '../../services/my-team-tiles-display-settings.service';

@Component({
  selector: 'app-my-team-content',
  templateUrl: './my-team-content.component.html',
  styleUrls: ['./my-team-content.component.scss']
})
export class MyTeamContentComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [{ labelMobile: 'My team', label: 'My team', order: 1, routerLink: '' }];
  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public state$: Observable<MyTeamState>;

  constructor(
    private myTeamStore: MyTeamStore,
    private myTeamFiltersService: MyTeamPlayersFitlersService,
    private myTeamDisplaySettingsService: MyTeamTilesDisplaySettingsService,
    private protertiesStore: PropertiesStore,
    private fixturesStore: FixturesStore
  ) {}

  public ngOnInit(): void {
    this.state$ = combineLatest([
      this.myTeamStore.select(),
      this.myTeamFiltersService.select(),
      this.myTeamDisplaySettingsService.select(),
      this.protertiesStore.selectLastMatchday(),
      this.fixturesStore.selectAll(),
      this.protertiesStore.selectLastKnownMatchday()
    ]).pipe(
      map(([myTeam, filters, displaySettings, lastMatchday, fixtures, lastKnownMatchday]) => {
        const nextFixtures = new ArrayStream<MatchdayFixtures>(fixtures)
          .filterQuick((f) => f.matchdayNumber > lastMatchday)
          .orderBy('matchdayNumber', 'asc')
          .collect();

        return {
          players: myTeam.players,
          kickOffTimesMatchdays: 0,
          filters,
          displaySettings,
          lastKnownMatchday,
          lastMatchday,
          nextFixtures
        };
      })
    );
  }
}
