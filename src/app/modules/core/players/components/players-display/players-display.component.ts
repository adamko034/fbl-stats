import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-players-display',
  templateUrl: './players-display.component.html',
  styleUrls: ['./players-display.component.scss']
})
export class PlayersDisplayComponent implements OnInit, AfterViewInit {
  @Input() key: string;

  @ViewChild(MatPaginator, { static: false }) set paginator(matPaginator: MatPaginator) {
    if (matPaginator) {
      this.displaySettingsService.registerPaginator(this.key, matPaginator);
    }
  }

  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  constructor(
    private screenSizeService: ScreenSizeService,
    private displaySettingsService: PlayersDisplaySettingsService
  ) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();
  }

  public ngAfterViewInit(): void {
    // this.displaySettingsService.registerPaginator(this.key, this.paginator);
  }
}
