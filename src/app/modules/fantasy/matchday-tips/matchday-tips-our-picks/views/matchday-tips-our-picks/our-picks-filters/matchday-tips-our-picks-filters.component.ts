import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { OurPicksFiltersService } from '../../../services/our-picks-filters.service';

@Component({
  selector: 'app-matchday-tips-our-picks-filters',
  templateUrl: './matchday-tips-our-picks-filters.component.html',
  styleUrls: ['./matchday-tips-our-picks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksFiltersComponent implements OnInit {
  public position$: Observable<PlayerPosition>;
  public types$: Observable<OurPicksType[]>;

  constructor(private filtersService: OurPicksFiltersService) {}

  public ngOnInit(): void {
    this.position$ = this.filtersService.selectAll().pipe(
      startWith({ position: PlayerPosition.ALL }),
      map((f) => (!!f.position ? f.position : PlayerPosition.ALL))
    );
    this.types$ = this.filtersService.selectAll().pipe(map((f) => f.types));
  }

  public onPositionChange(position: PlayerPosition): void {
    this.filtersService.updatePosition(position);
  }

  public onTypesChange(types: OurPicksType[]): void {
    this.filtersService.updateTypes(types);
  }
}
