import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { OurPicksFiltersService } from '../../services/our-picks-filters.service';

@Component({
  selector: 'app-our-picks-filters',
  templateUrl: './our-picks-filters.component.html',
  styleUrls: ['./our-picks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksFiltersComponent implements OnInit {
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
