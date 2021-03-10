import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MyTeamPlayer } from '../../../../models/my-team-player.model';

@Component({
  selector: 'app-my-team-player-search',
  templateUrl: './my-team-player-search.component.html',
  styleUrls: ['./my-team-player-search.component.scss']
})
export class MyTeamPlayerSearchComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  public playerSearch = new FormControl();
  public foundPlayers$: Observable<MyTeamPlayer[]>;

  @ViewChild(MatInput) searchInput;

  constructor(private myTeamService: MyTeamStore, private toastrService: ToastrService) {}

  public ngOnInit(): void {
    this.foundPlayers$ = combineLatest([this.playerSearch.valueChanges, this.myTeamService.selectMyTeamPlayers()]).pipe(
      switchMap(([term, myTeamPlayers]) => {
        if (!term || term.length <= 1 || !isNaN(+term)) {
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

  public onPlayerSelected(selectedValue: string) {
    const values = selectedValue.split(';');
    this.myTeamService.add(values[0]);
    this.playerSearch.setValue(null);
    this.toastrService.success(`${values[1]} was added.`, null, { positionClass: 'toast-top-center' });
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
