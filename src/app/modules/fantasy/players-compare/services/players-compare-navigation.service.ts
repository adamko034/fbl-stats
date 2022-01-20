import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PlayersCompareNavigationService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public removePlayer(idToRemove: string): void {
    const ids: string[] = this.currentIds();

    let withoutRemoved = ids.filter((id) => id != idToRemove);

    if (withoutRemoved.length === 0) {
      this.router.navigate([], { queryParams: { cleared: 'true', ids: null }, queryParamsHandling: 'merge' });
      return;
    }

    this.router.navigate([], {
      queryParams: { fromQuickLink: null, ids: withoutRemoved },
      queryParamsHandling: 'merge'
    });
  }

  public addPlayer(id: string): void {
    const currentIds = this.currentIds();
    const newIds = [...currentIds, id];

    this.router.navigate([], {
      queryParams: { fromQuickLink: null, cleared: null, ids: newIds },
      queryParamsHandling: 'merge'
    });
  }

  private currentIds(): string[] {
    return this.route.snapshot.queryParamMap.getAll('ids') ?? [];
  }
}
