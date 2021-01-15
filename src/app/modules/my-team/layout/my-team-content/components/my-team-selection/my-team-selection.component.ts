import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamTilesDisplaySettingsService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-tiles-display-settings.service';
import { MyTeamPlayer } from 'src/app/modules/my-team/models/my-team-player.model';
import { MyTeamStore } from 'src/app/modules/my-team/store/my-team.store';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-my-team-selection',
  templateUrl: './my-team-selection.component.html',
  styleUrls: ['./my-team-selection.component.scss'],
  animations: [
    trigger('tilesDisplay', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.3s ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('0.3s ease-out', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class MyTeamSelectionComponent implements OnInit {
  public positions = PlayerPosition;
  public players$: Observable<MyTeamPlayer[]>;
  public tilesDisplayed$: Observable<boolean>;

  public screenSize$: Observable<ScreenSize>;
  public screens = ScreenSize;

  constructor(
    private myTeamService: MyTeamStore,
    private myTeamTilesDisplaySettingsService: MyTeamTilesDisplaySettingsService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.players$ = this.myTeamService.selectMyTeamPlayers();
    this.tilesDisplayed$ = this.myTeamTilesDisplaySettingsService.selectDisplayed();
    this.screenSize$ = this.screenSizeService.onResize();
  }
}
