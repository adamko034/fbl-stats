import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-players-filters',
  templateUrl: './players-filters.component.html',
  styleUrls: ['./players-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersFiltersComponent {
  constructor() {}
}
