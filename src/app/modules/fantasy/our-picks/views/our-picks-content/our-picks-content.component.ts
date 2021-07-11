import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchdaysNavigationService } from 'src/app/services/matchdays-navigation.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-our-picks-content',
  templateUrl: './our-picks-content.component.html',
  styleUrls: ['./our-picks-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksContentComponent {
  private _links = [{ label: 'Our picks', labelMobile: 'Our picks', order: 1, routerLink: '' }];
  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor(private route: ActivatedRoute, private matchdaysService: MatchdaysNavigationService) {}

  // public ngOnInit(): void {
  //   this.links$ = this.route.data.pipe(
  //     map((data) => data.matchdays),
  //     map((matchdays: number[]) => this.matchdaysService.toTabNavigationLinks(matchdays))
  //   );
  //}
}
