import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { HistoryPlayersFilters } from '../../../models/history-players-filters.model';
import { HistoryPlayersFiltersService } from '../../../services/history-players-fitlers.service';

@Component({
  selector: 'app-history-players-filters',
  templateUrl: './history-players-filters.component.html',
  styleUrls: ['./history-players-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPlayersFiltersComponent implements OnInit {
  public filters$: Observable<HistoryPlayersFilters>;

  constructor(private filtersService: HistoryPlayersFiltersService) {}

  public ngOnInit(): void {
    this.filters$ = this.filtersService.select();
  }

  public updateMaxPrice(value: number) {
    this.filtersService.changeMaxPrice(value);
  }

  public updateMaxPopularity(value: number): void {
    this.filtersService.changeMaxPopularity(value);
  }

  public updateTeams(value: string[]): void {
    this.filtersService.changeTeams(value);
  }

  public updatePosition(value: PlayerPosition): void {
    this.filtersService.changePosition(value);
  }
}
