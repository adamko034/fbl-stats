import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatMenuTrigger } from '@angular/material/menu';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlayerPicker } from '../../models/player-picker.model';
import { PlayersPickerCustomType } from '../../models/players-picker-custom-type.model';
import { PlayersPickerFilters } from '../../models/players-picker-fitlers.model';
import { PlayerPickerService } from '../../services/player-picker.service';

@UntilDestroy()
@Component({
  selector: 'app-players-picker',
  templateUrl: './players-picker.component.html',
  styleUrls: ['./players-picker.component.scss']
})
export class PlayersPickerComponent implements OnInit {
  @Input() filters: PlayersPickerFilters;
  @Input() closeAfterSelect: boolean = false;
  @Input() customType?: PlayersPickerCustomType;
  @Input() type: 'button' | 'icon' | 'normal' | 'custom' = 'button';
  @Output() playerSelected = new EventEmitter<PlayerPicker>();

  public foundPlayers$: Observable<PlayerPicker[]>;
  public playerSearch = new UntypedFormControl();
  public opened = false;

  @ViewChild(MatInput) searchInput;
  @ViewChild('trigger') trigger: MatMenuTrigger;

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

    if (this.closeAfterSelect) {
      this.trigger.closeMenu();
    }

    this.playerSelected.emit({ id: values[0], name: values[1] });
  }

  private searchPlayersAndFilterAlreadySelected(term: string): Observable<PlayerPicker[]> {
    return this.pickerService.search(this.filters, term);
  }
}
