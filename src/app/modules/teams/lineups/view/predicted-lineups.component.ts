import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { Team } from 'src/app/store/teams/models/team.model';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups',
  templateUrl: './predicted-lineups.component.html',
  styleUrls: ['./predicted-lineups.component.scss']
})
export class PredictedLineupsComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Predicted lineups', order: 1, labelMobile: 'Teams predicted lineups', routerLink: 'teams' },
    { label: 'Sources', order: 2, labelMobile: 'Predicted lineups sources', routerLink: 'sources' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public isMobile$: Observable<boolean>;

  constructor(private screenService: ScreenSizeService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenService.isMobile$();
    this.route.data
      .pipe(
        map((data) => data.teams),
        untilDestroyed(this)
      )
      .subscribe((teams: Team[]) => {
        // this._links = teams.map((team: Team) => ({
        //   order: team.rank,
        //   routerLink: team.shortName,
        //   labelMobile: team.name,
        //   label: team.name
        // }));
        // this._links.push({ label: 'Summary', labelMobile: 'Summary', routerLink: '/teams/lineups', order: 0 });
      });
  }
}
