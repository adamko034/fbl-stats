import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { StartupLoadingService, StartupLoadingState } from 'src/app/services/startup-loading.service';

@Component({
  selector: 'app-startup-loading',
  templateUrl: './startup-loading.component.html',
  styleUrls: ['./startup-loading.component.scss']
})
export class StartupLoadingComponent implements OnInit {
  private positionsLoaded = 0;

  public get value(): number {
    if (this.positionsLoaded === 0) {
      return 0;
    }

    return Math.round((100 * this.positionsLoaded) / this.startupLoading.count());
  }

  constructor(private startupLoading: StartupLoadingService) {}

  ngOnInit(): void {
    this.startupLoading
      .select()
      .pipe(delay(300))
      .subscribe((loadingState: StartupLoadingState) => {
        this.positionsLoaded = Object.values(loadingState).filter((loaded) => loaded).length;
      });
  }
}
