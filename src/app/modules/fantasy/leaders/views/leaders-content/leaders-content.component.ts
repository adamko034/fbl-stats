import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdaysNavigationService } from 'src/app/services/matchdays-navigation.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent implements OnInit {
  public links$: Observable<ViewTabNavigationLink[]>;

  constructor(private route: ActivatedRoute, private matchdaysService: MatchdaysNavigationService) {}

  public ngOnInit(): void {
    this.links$ = this.route.data.pipe(
      map((data) => data.matchdaysNumbers),
      map((matchdays: number[]) => this.matchdaysService.toTabNavigationLinks(matchdays))
    );
  }
}
