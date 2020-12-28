import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamTilesDisplaySettingsService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-tiles-display-settings.service';

@Component({
  selector: 'app-my-team-tile-order-by',
  templateUrl: './my-team-tile-order-by.component.html',
  styleUrls: ['./my-team-tile-order-by.component.scss']
})
export class MyTeamTileOrderByComponent implements OnInit {
  public currentOrder$: Observable<string>;
  public displayed$: Observable<boolean>;

  constructor(private myTeamTileOrderService: MyTeamTilesDisplaySettingsService) {}

  public ngOnInit(): void {
    this.currentOrder$ = this.myTeamTileOrderService.selectTileOrder();
    this.displayed$ = this.myTeamTileOrderService.selectDisplayed();
  }

  public onOrderChanged(newOrder: string): void {
    this.myTeamTileOrderService.changeOrder(newOrder);
  }

  public onShowTilesToggled(): void {
    this.myTeamTileOrderService.toggleDisplayed();
  }
}
