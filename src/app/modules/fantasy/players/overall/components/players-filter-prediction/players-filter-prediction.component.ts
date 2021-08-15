import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PlayersPrediciton } from '../../models/players-filters';

@Component({
  selector: 'app-players-filter-prediction',
  templateUrl: './players-filter-prediction.component.html',
  styleUrls: ['./players-filter-prediction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersFilterPredictionComponent implements OnInit {
  public predictions = PlayersPrediciton;

  public value$: Observable<PlayersPrediciton>;

  constructor(private filtersStore: FiltersStoreService) {}

  public ngOnInit(): void {
    this.value$ = this.filtersStore.selectPredictions();
  }

  public onPredictionChange(newValue: PlayersPrediciton): void {
    this.filtersStore.updatePrediction(newValue === PlayersPrediciton.All ? null : newValue);
  }
}
