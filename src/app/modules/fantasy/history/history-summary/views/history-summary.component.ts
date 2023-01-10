import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationMenuLink } from 'src/app/common/components/ui/navigation-menu/navigation-menu-link.model';

@Component({
  selector: 'app-history-summary',
  templateUrl: './history-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorySummaryComponent implements OnInit {
  public links: NavigationMenuLink[] = [
    {
      order: 1,
      label: 'Season 2021-2022',
      labelMobile: 'Season 2021-2022',
      routerLink: '/fantasy/history/2021-2022/summary'
    },
    {
      order: 2,
      label: 'Season 2020-2021',
      labelMobile: 'Season 2020-2021',
      routerLink: '/fantasy/history/2020-2021/summary'
    }
  ];
  public title$: Observable<string>;

  constructor(private _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.title$ = this._route.data.pipe(map((data) => `Team of the Season ${data.history.season}`));
  }
}
