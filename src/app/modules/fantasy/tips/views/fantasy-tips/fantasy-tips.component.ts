import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { FantasyTips } from '../../models/fantasy-tips.model';

@Component({
  selector: 'app-fantasy-tips',
  templateUrl: './fantasy-tips.component.html',
  styleUrls: ['./fantasy-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyTipsComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Matchday tips', labelMobile: 'Matchday tips', order: 1, routerLink: '' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public tips$: Observable<FantasyTips>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.tips$ = this.route.data.pipe(map((data) => data.tips));
  }
}
