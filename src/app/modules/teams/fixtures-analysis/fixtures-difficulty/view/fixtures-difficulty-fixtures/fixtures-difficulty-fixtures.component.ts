import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { FixturesDifficultyCalculation } from '../../models/fixtures-difficulty-calculation.enum';
import { FixturesDifficultyTeam } from '../../models/fixtures-difficulty-team.model';

@Component({
  selector: 'app-fixtures-difficulty-fixtures',
  templateUrl: './fixtures-difficulty-fixtures.component.html',
  styleUrls: ['./fixtures-difficulty-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyFixturesComponent implements OnInit {
  @Input() teams: FixturesDifficultyTeam[];
  @Input() calculation: FixturesDifficultyCalculation;
  @Input() set matchdays(value: FromTo) {
    this._mds = [];
    for (let i = value.from; i <= value.to; i++) {
      this._mds.push(i);
    }
  }

  public screens = ScreenSize;

  private _mds: number[] = [];
  public get mds(): number[] {
    return this._mds;
  }

  public get orderTable(): string {
    return this.calculation === FixturesDifficultyCalculation.BY_FORM ? 'value' : '-value';
  }

  public get titleTable(): string {
    return this.calculation === FixturesDifficultyCalculation.BY_FORM ? 'Form' : 'Rank';
  }

  constructor() {}

  public ngOnInit(): void {}
}
