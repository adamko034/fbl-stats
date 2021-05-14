import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { FixtureDifficulty } from '../../models/fixture-difficulty.model';
import { FixturesDifficultyState } from '../../models/fixtures-difficulty.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-fixtures',
  templateUrl: './fixtures-difficulty-fixtures.component.html',
  styleUrls: ['./fixtures-difficulty-fixtures.component.scss']
})
export class FixturesDifficultyFixturesComponent implements OnInit {
  @Input() state: FixturesDifficultyState;
  @Input() sortBy: SortBy;

  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();
  }

  public getGames(team: FixtureDifficulty) {
    return Object.values(team.games);
  }
}
