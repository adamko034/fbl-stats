import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { FixturesDifficultyCalculation } from '../../models/fixtures-difficulty-calculation.enum';
import { FixturesDifficultyFilters } from '../../models/fixtures-difficulty-filters.model';
import { FixturesDifficultyFiltersService } from '../../services/fixtures-difficulty-filters.service';

@Component({
  selector: 'app-fixtures-difficulty-filters',
  templateUrl: './fixtures-difficulty-filters.component.html',
  styleUrls: ['./fixtures-difficulty-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyFiltersComponent implements OnInit {
  @Input() filters: FixturesDifficultyFilters;

  private _calculations: SwitchItem[] = [
    { value: FixturesDifficultyCalculation.BY_RANK, description: 'By rank' },
    { value: FixturesDifficultyCalculation.BY_FORM, description: 'By form' }
  ];

  public get calculations(): SwitchItem[] {
    return this._calculations;
  }

  public get byForm(): FixturesDifficultyCalculation {
    return FixturesDifficultyCalculation.BY_FORM;
  }

  constructor(private filtersService: FixturesDifficultyFiltersService) {}

  ngOnInit(): void {}

  public onIncludeVenuChange(change: MatCheckboxChange): void {
    this.filtersService.changeIncludeVenue(change.checked);
  }

  public onCalculationChange(newValue: FixturesDifficultyCalculation): void {
    this.filtersService.changeCalculation(newValue);
  }

  public onMatchdaysChange(newValue: number): void {
    this.filtersService.changeMatchdays(newValue);
  }

  public onFormMatchdaysChange(newValue: number): void {
    this.filtersService.changeFormMatchdays(newValue);
  }
}
