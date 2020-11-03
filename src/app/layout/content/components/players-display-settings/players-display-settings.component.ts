import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-display-settings',
  templateUrl: './players-display-settings.component.html',
  styleUrls: ['./players-display-settings.component.scss']
})
export class PlayersDisplaySettingsComponent implements OnInit {
  @Input() opened = false;

  public searchChanged$: Observable<string>;

  constructor(private filtersStoreService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.searchChanged$ = this.filtersStoreService.selectName();
  }

  public clearSearch(): void {
    this.filtersStoreService.updateName(null);
  }
}
