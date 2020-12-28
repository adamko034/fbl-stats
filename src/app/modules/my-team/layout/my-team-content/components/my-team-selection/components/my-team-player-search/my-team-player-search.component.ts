import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { MyTeamPlayer } from 'src/app/modules/my-team/models/my-team-player.model';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';

@Component({
  selector: 'app-my-team-player-search',
  templateUrl: './my-team-player-search.component.html',
  styleUrls: ['./my-team-player-search.component.scss']
})
export class MyTeamPlayerSearchComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public playerSearch = new FormControl();
  public foundPlayers$: Observable<MyTeamPlayer[]>;

  constructor(private myTeamService: MyTeamStore) {}

  public ngOnInit(): void {
    this.foundPlayers$ = combineLatest([this.playerSearch.valueChanges, this.myTeamService.selectMyTeamPlayers()]).pipe(
      filter(([term]) => isNaN(+term)),
      switchMap(([term, myTeamPlayers]) => {
        if (!term || term.length <= 1) {
          return of([]);
        }

        return this.searchPlayersAndFilterAlredySelected(term, myTeamPlayers);
      }),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public onPlayerSelected(id: string) {
    this.myTeamService.add(id);
    this.playerSearch.setValue(null);
  }

  private searchPlayersAndFilterAlredySelected(
    term: string,
    myTeamPlayers: MyTeamPlayer[]
  ): Observable<MyTeamPlayer[]> {
    return this.myTeamService
      .searchPlayers(term)
      .pipe(map((players) => players.filter((p) => myTeamPlayers.findIndex((m) => m.id === p.id) < 0)));
  }
}
