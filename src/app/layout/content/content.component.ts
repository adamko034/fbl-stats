import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public showContent = false;

  public get panelsOpened(): boolean {
    return !this.deviceDetector.isMobile();
  }

  constructor(private filtersStoreService: FiltersStoreService, private deviceDetector: DeviceDetectorService) {}

  public ngOnInit(): void {
    this.filtersStoreService.selectPosition().subscribe((position) => (this.showContent = !!position));
  }
}
