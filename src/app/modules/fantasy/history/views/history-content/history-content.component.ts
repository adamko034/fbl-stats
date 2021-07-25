import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-history-content',
  templateUrl: './history-content.component.html',
  styleUrls: ['./history-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryContentComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Players', labelMobile: `${this.season} players`, order: 2, routerLink: 'players' },
    { label: 'Summary', labelMobile: `${this.season} summary`, order: 1, routerLink: 'summary' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public get season(): string {
    const seasonFromPath: string = this.route.snapshot.params.season;
    return seasonFromPath
      .split('-')
      .map((short) => `20${short}`)
      .join('-');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
