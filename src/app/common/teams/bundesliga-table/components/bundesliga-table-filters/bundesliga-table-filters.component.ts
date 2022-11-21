import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Venue } from 'src/app/shared/models/venue.enum';
import { BundesligaTableFilters } from '../../models/internal/bundesliga-table-filters';
import { BundesligaTableConfig } from '../../models/state/bundesliga-table-config';

@Component({
  selector: 'app-bundesliga-table-filters',
  templateUrl: './bundesliga-table-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableFiltersComponent implements OnInit {
  @Input() filters: BundesligaTableFilters;
  @Input() config: BundesligaTableConfig;
  @Input() lastMatchday: number;

  @Output() venueChange = new EventEmitter<Venue>();
  @Output() matchdaysChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onVenueChange(value: Venue) {
    this.venueChange.emit(value);
  }

  public onMatchdaysChange(matchdays: number): void {
    this.matchdaysChange.emit(matchdays);
  }
}
