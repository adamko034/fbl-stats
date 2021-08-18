import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-fixtures-difficulty-content',
  templateUrl: './fixtures-difficulty-content.component.html',
  styleUrls: ['./fixtures-difficulty-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyContentComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Fixtures by ranking', labelMobile: 'Fixtures difficulty by ranking', routerLink: 'byRank', order: 1 },
    { label: 'Fixtures by form', labelMobile: 'Fixtures difficulty by form', routerLink: 'byForm', order: 2 }
  ];

  public links$: Observable<ViewTabNavigationLink[]>;

  constructor(private propertiesStore: PropertiesStore) {}

  public ngOnInit(): void {
    this.links$ = this.propertiesStore.selectLastMatchday().pipe(
      first(),
      map((lastMatchday) => {
        if (lastMatchday <= 1) {
          return this._links.filter((x) => x.routerLink !== 'byForm');
        }

        return this._links;
      })
    );
  }
}
