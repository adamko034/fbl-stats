import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-filters-layout',
  templateUrl: './filters-layout.component.html',
  styleUrls: ['./filters-layout.component.scss']
})
export class FiltersLayoutComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }
}
