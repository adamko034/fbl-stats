import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersCompareFiltersService } from '../../services/players-compare-filters.service';

@Component({
  selector: 'app-players-compare-filters',
  templateUrl: './players-compare-filters.component.html',
  styleUrls: ['./players-compare-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareFiltersComponent implements OnInit {
  public includeMatchdays$: Observable<number>;
  public includePastMatchdays$: Observable<number>;

  constructor(private playersCompareFilters: PlayersCompareFiltersService) {}

  public ngOnInit(): void {
    this.includeMatchdays$ = this.playersCompareFilters
      .selectFilters()
      .pipe(map((filters) => filters.includeMatchdays));

    this.includePastMatchdays$ = this.playersCompareFilters
      .selectFilters()
      .pipe(map((filters) => filters.includePastMatchdays));
  }

  public onIncludeMatchdaysChange(mds: number): void {
    this.playersCompareFilters.updateIncludeMatchdays(mds);
  }

  public onIncludePastMatchdaysChange(mds: number): void {
    this.playersCompareFilters.updateIncludePastMatchdays(mds);
  }
}
