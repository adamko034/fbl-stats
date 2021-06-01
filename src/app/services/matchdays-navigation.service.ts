import { Injectable } from '@angular/core';
import { ViewTabNavigationLink } from '../shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { ArrayStream } from './array-stream.service';

@Injectable({ providedIn: 'root' })
export class MatchdaysNavigationService {
  public toTabNavigationLinks(matchdays: number[], sort: 'asc' | 'desc' = 'desc'): ViewTabNavigationLink[] {
    if (!matchdays) {
      return [];
    }

    const maxMatchday = Math.max(...matchdays);
    const func = this.getMatchdaysToTabLinkFunc(maxMatchday, sort);

    return new ArrayStream<number>(matchdays, false).convertQuick<ViewTabNavigationLink>(func).collect();
  }

  private getMatchdaysToTabLinkFunc(max: number, sort: 'asc' | 'desc'): (matchday: number) => ViewTabNavigationLink {
    return (matchday: number) => ({
      label: `Matchday ${matchday}`,
      routerLink: `${matchday}`,
      order: sort === 'desc' ? max - matchday : matchday
    });
  }
}
