import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, startWith, tap } from 'rxjs/operators';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';
import { OurPicksFiltersExecutor } from '../../loaders/filters/our-picks-filters-executor';
import { OurPicksFilters } from '../../models/our-picks-filters.model';
import { OurPicksPlayer } from '../../models/our-picks-player.model';
import { OurPicksPlayers } from '../../models/our-picks-players.model';
import { OurPicksFiltersService } from '../../services/our-picks-filters.service';

@Component({
  selector: 'app-our-picks-players',
  templateUrl: './our-picks-players.component.html',
  styleUrls: ['./our-picks-players.component.scss']
})
export class OurPicksPlayersComponent implements OnInit {
  @Input() ourPicks: OurPicksPlayers;

  public players: OurPicksPlayer[];

  constructor(private filtersService: OurPicksFiltersService, private filtersExecutor: OurPicksFiltersExecutor) {}

  public ngOnInit(): void {
    this.players = [...this.ourPicks?.players] || [];
    this.filtersService.selectAll().subscribe((filters: OurPicksFilters) => {
      if (!!filters) this.players = this.filtersExecutor.filter([...this.ourPicks.players], filters);
    });
  }
}
