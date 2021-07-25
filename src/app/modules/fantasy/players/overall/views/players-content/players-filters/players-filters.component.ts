import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-players-filters',
  templateUrl: './players-filters.component.html',
  styleUrls: ['./players-filters.component.scss']
})
export class PlayersFiltersComponent implements OnInit {
  public isMobile$: Observable<boolean>;
  public lastMatchday$: Observable<number>;

  constructor(private screenSizeService: ScreenSizeService, private propertiesService: PropertiesStore) {}

  ngOnInit() {
    this.isMobile$ = this.screenSizeService.isMobile$();
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
  }
}
