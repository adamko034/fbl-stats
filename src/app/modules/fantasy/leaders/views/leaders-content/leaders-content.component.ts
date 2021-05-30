import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent implements OnInit {
  public links$: Observable<ViewTabNavigationLink[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.links$ = this.route.data.pipe(
      map((data) => data.matchdaysNumbers),
      map((matchdays: number[]) => {
        if (!matchdays) {
          return [];
        }

        const maxMatchday = Math.max(...matchdays);
        const func = this.getMatchdaysToTabLinkFunc(maxMatchday);

        return new ArrayStream<number>(matchdays, false).convertQuick<ViewTabNavigationLink>(func).collect();
      })
    );
  }

  private getMatchdaysToTabLinkFunc(max: number): (matchday: number) => ViewTabNavigationLink {
    return (matchday: number) => ({
      label: `Matchday ${matchday}`,
      routerLink: `${matchday}`,
      order: max - matchday
    });
  }
}
