import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayersFilterPrediciton } from 'src/app/common/players/models/players-filter-prediction.enum';

@Component({
  selector: 'app-prediction-dropdown',
  templateUrl: './prediction-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionDropdownComponent {
  @Input() value: PlayersFilterPrediciton;
  @Output() change = new EventEmitter<PlayersFilterPrediciton>();

  public predictions = PlayersFilterPrediciton;

  constructor() {}

  public onPredictionChange(newValue: PlayersFilterPrediciton): void {
    this.change.emit(newValue);
  }
}
