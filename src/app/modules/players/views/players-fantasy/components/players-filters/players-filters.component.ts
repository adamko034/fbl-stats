import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-players-filters',
  templateUrl: './players-filters.component.html',
  styleUrls: ['./players-filters.component.scss']
})
export class PlayersFiltersComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit() {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }
}
