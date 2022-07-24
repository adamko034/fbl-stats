import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { MatchdayTipsOurPicksFiltersService } from '../../../services/matchday-tips-our-picks-filters.service';

@Component({
  selector: 'app-matchday-tips-our-picks-filters',
  templateUrl: './matchday-tips-our-picks-filters.component.html',
  styleUrls: ['./matchday-tips-our-picks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksFiltersComponent implements OnInit {
  public position$: Observable<Position>;
  public types$: Observable<MatchdayTipsOurPicksType[]>;

  constructor(private filtersService: MatchdayTipsOurPicksFiltersService) {}

  public ngOnInit(): void {
    this.position$ = this.filtersService.selectAll().pipe(
      startWith({ position: Position.ALL }),
      map((f) => (!!f.position ? f.position : Position.ALL))
    );
    this.types$ = this.filtersService.selectAll().pipe(map((f) => f.types));
  }

  public onPositionChange(position: Position): void {
    this.filtersService.updatePosition(position);
  }

  public onTypesChange(types: MatchdayTipsOurPicksType[]): void {
    this.filtersService.updateTypes(types);
  }
}
