import { Component, OnInit, Input } from '@angular/core';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksFilters } from '../../models/our-picks-filters.model';
import { OurPicksFiltersExecutor } from '../../services/our-picks-filters-executor';
import { OurPicksFiltersService } from '../../services/our-picks-filters.service';

@Component({
  selector: 'app-our-picks-players',
  templateUrl: './our-picks-players.component.html',
  styleUrls: ['./our-picks-players.component.scss']
})
export class OurPicksPlayersComponent implements OnInit {
  @Input() ourPicks: OurPicksPlayers;

  public players: OurPicksPlayer[];
  public get published(): boolean {
    return this.ourPicks?.published || false;
  }

  constructor(private filtersService: OurPicksFiltersService, private filtersExecutor: OurPicksFiltersExecutor) {}

  public ngOnInit(): void {
    this.players = [...this.ourPicks?.players] || [];
    this.filtersService.selectAll().subscribe((filters: OurPicksFilters) => {
      if (!!filters) this.players = this.filtersExecutor.filter([...this.ourPicks.players], filters);
    });
  }
}
