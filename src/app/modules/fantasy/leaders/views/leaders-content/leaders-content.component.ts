import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchdaysNavigationService } from 'src/app/services/matchdays-navigation.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Leaders stats', labelMobile: 'Leaders stats', routerLink: '', order: 1 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor(private route: ActivatedRoute, private matchdaysService: MatchdaysNavigationService) {}

  // public ngOnInit(): void {
  //   this.links$ = this.route.data.pipe(
  //     map((data) => data.matchdaysNumbers),
  //     map((matchdays: number[]) => this.matchdaysService.toTabNavigationLinks(matchdays))
  //   );
  // }
}
