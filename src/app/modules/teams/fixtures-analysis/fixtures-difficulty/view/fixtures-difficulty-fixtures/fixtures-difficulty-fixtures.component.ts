import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

  public get mds(): number[] {
    return this.teams[0]?.fixtures?.map((f) => f.matchday).sort();
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
