import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-players-filter-matchdays',
  templateUrl: './players-filter-matchdays.component.html',
  styleUrls: ['./players-filter-matchdays.component.scss']
})
export class PlayersFilterMatchdaysComponent implements OnInit {
  public matchdays$: Observable<number>;
  public lastMatchday$: Observable<number>;

  constructor(private propertiesService: PropertiesService, private filtersService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.matchdays$ = this.filtersService.selectMatchdays();
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
  }

  public onMatchdaysChanged(matchdays: number) {
    this.filtersService.updateMatchdays(matchdays);
  }
}
