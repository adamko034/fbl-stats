import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LineupsSource } from 'src/app/models/properties.model';
import { LineupsTeamSourceUrl } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/models/lineups-team-source-url.model';
import { PropertiesService } from 'src/app/services/properties.service';

@Injectable({ providedIn: 'root' })
export class LineupsTeamSourceUrlService {
  private destroyed$ = new Subject<void>();

  constructor(private propertiesService: PropertiesService) {}

  public select(source: LineupsSource, teamShort: string): Observable<LineupsTeamSourceUrl> {
    return this.propertiesService.selectLineupSources(source).pipe(
      map((lineupSource) => {
        const lineupsTeamSourceUrl: LineupsTeamSourceUrl = {
          source: source.toString(),
          teamShort,
          url: lineupSource.teams[teamShort],
          displayName: lineupSource.name
        };
        return lineupsTeamSourceUrl;
      }),
      takeUntil(this.destroyed$)
    );
  }

  public close() {
    this.destroyed$.next();
  }
}
