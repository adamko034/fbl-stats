import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { Player } from 'src/app/store/players/models/player.model';
import { MyTeamTilesDisplaySettings } from '../../models/my-team-tiles-display-settings.model';

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
  @Input() players: Player[];
  @Input() settings: MyTeamTilesDisplaySettings;

  public positions = Position;

  public screenSize$: Observable<ScreenSize>;
  public screens = ScreenSize;

  constructor(
    private screenSizeService: ScreenSizeService,
    private myTeamStore: MyTeamStore,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.screenSize$ = this.screenSizeService.onResize();
  }

  public onPlayerSelected(player: PlayerPicker) {
    this.myTeamStore.add(player.id.toString());
    this.toastrService.success(`${player.name} was added.`, null, { positionClass: 'toast-top-center' });
  }
}
