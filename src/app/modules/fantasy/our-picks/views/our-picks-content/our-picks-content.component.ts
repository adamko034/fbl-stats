import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdaysNavigationService } from 'src/app/services/matchdays-navigation.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-our-picks-content',
  templateUrl: './our-picks-content.component.html',
  styleUrls: ['./our-picks-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksContentComponent implements OnInit {
  public links$: Observable<ViewTabNavigationLink[]>;

  constructor(private route: ActivatedRoute, private matchdaysService: MatchdaysNavigationService) {}

  public ngOnInit(): void {
    this.links$ = this.route.data.pipe(
      map((data) => data.matchdays),
      map((matchdays: number[]) => this.matchdaysService.toTabNavigationLinks(matchdays))
    );
  }
}
