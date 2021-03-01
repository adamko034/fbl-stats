import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlayerPicker } from '../../models/player-picker.model';
import { PlayerPickerService } from '../../services/player-picker.service';

@UntilDestroy()
@Component({
  selector: 'app-players-picker',
  templateUrl: './players-picker.component.html',
  styleUrls: ['./players-picker.component.scss']
})
export class PlayersPickerComponent implements OnInit {
  @Input() excluded: number[];
  @Output() playerSelected = new EventEmitter<PlayerPicker>();

  public foundPlayers$: Observable<PlayerPicker[]>;
  public playerSearch = new FormControl();
  public opened = false;

  @ViewChild(MatInput) searchInput;

  constructor(private pickerService: PlayerPickerService) {}

  public ngOnInit(): void {
    this.foundPlayers$ = this.playerSearch.valueChanges.pipe(
      switchMap((term) => {
        if (!term || term.length <= 1 || !isNaN(+term)) {
          return of([]);
        }

        return this.searchPlayersAndFilterAlreadySelected(term);
      }),
      untilDestroyed(this)
    );
  }

  public onPlayerSelected(selectedValue: string) {
    const values = selectedValue.split(';');
    this.playerSearch.setValue(null);
    this.playerSelected.emit({ id: values[0], name: values[1] });
  }

  private searchPlayersAndFilterAlreadySelected(term: string): Observable<PlayerPicker[]> {
    return this.pickerService
      .search(term)
      .pipe(map((players) => players.filter((p) => this.excluded.findIndex((id) => id === p.id) < 0)));
  }
}
