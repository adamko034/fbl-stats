import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { FixturesDifficultyStateNew } from '../models/fixtures-difficulty-state.model';

@Component({
  selector: 'app-fixtures-difficulty',
  templateUrl: './fixtures-difficulty.component.html',
  styleUrls: ['./fixtures-difficulty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Fixtures difficulty', labelMobile: 'Fixtures difficulty', routerLink: '', order: 1 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }
  public state$: Observable<FixturesDifficultyStateNew>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
