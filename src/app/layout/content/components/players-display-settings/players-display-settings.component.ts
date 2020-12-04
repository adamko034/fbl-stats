import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-players-display-settings',
  templateUrl: './players-display-settings.component.html',
  styleUrls: ['./players-display-settings.component.scss']
})
export class PlayersDisplaySettingsComponent implements OnInit {
  @Input() opened = false;

  public searchChanged$: Observable<string>;
  public screenSize$: Observable<ScreenSize>;

  public ScreenSize = ScreenSize;

  constructor(private filtersStoreService: FiltersStoreService, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.searchChanged$ = this.filtersStoreService.selectName();
    this.screenSize$ = this.screenSizeService.onResize();
  }

  public clearSearch(): void {
    this.filtersStoreService.updateName(null);
  }
}
