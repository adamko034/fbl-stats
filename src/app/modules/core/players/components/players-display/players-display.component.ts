import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

@Component({
  selector: 'app-players-display',
  templateUrl: './players-display.component.html',
  styleUrls: ['./players-display.component.scss']
})
export class PlayersDisplayComponent implements OnInit {
  @Input() key: string;
  @Input() sortItems: SortByItem[] = null;
  @Input() sortBy: SortBy = null;
  @Output() sortChange = new EventEmitter<SortBy>();

  @ViewChild(MatPaginator, { static: false }) set paginator(matPaginator: MatPaginator) {
    if (matPaginator) {
      this.displaySettingsService.registerPaginator(this.key, matPaginator);
    }
  }
  public isMobile$: Observable<boolean>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private displaySettingsService: PlayersDisplaySettingsService
  ) {}

  public ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }

  public onSortChange(sortBy: SortBy): void {
    this.sortChange.emit(sortBy);
  }
}
