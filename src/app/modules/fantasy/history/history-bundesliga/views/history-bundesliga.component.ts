import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationMenuLink } from 'src/app/common/components/ui/navigation-menu/navigation-menu-link.model';
import { BundesligaTableState } from 'src/app/common/teams/bundesliga-table/models/bundesliga-table-state';
import { BundesligaTableConfig } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-config';
import { HistoryBundesligaTeamsConverter } from '../logic/history-bundesliga-teams.converter';

@Component({
  selector: 'app-history-bundesliga',
  templateUrl: './history-bundesliga.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryBundesligaComponent implements OnInit {
  private _bundesligaTableConfig: BundesligaTableConfig = {
    showTitle: true,
    showVenueFilter: true
  };

  public links: NavigationMenuLink[] = [
    {
      order: 1,
      label: 'Season 2021-2022',
      labelMobile: 'Season 2021-2022',
      routerLink: '/fantasy/history/2021-2022/bundesliga'
    },
    {
      order: 2,
      label: 'Season 2020-2021',
      labelMobile: 'Season 2020-2021',
      routerLink: '/fantasy/history/2020-2021/bundesliga'
    }
  ];
  public bundesligaTableState$: Observable<BundesligaTableState>;

  constructor(private route: ActivatedRoute, private _converter: HistoryBundesligaTeamsConverter) {}

  public ngOnInit(): void {
    this.bundesligaTableState$ = this.route.data.pipe(
      map((data) => data.history),
      map((history) => {
        return {
          config: this._bundesligaTableConfig,
          teams: this._converter.convertToBundesligaTeams(history.teams),
          season: history.season,
          lastMatchday: 34,
          selectedTeams: []
        };
      })
    );
  }
}
