import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MyTeamTilesDisplaySettingsService } from '../../../../services/my-team-tiles-display-settings.service';

@Component({
  selector: 'app-my-team-options',
  templateUrl: './my-team-options.component.html',
  styleUrls: ['./my-team-options.component.scss']
})
export class MyTeamOptionsComponent implements OnInit {
  public currentOrder$: Observable<string>;
  public displayed$: Observable<boolean>;

  constructor(private myTeamTileOrderService: MyTeamTilesDisplaySettingsService, private myTeamStore: MyTeamStore) {}

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

  public onClearMyTeam(): void {
    this.myTeamStore.clear();
  }
}
