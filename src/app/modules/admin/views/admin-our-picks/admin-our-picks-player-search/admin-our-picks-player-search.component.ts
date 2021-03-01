import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OurPicksPlayerLoader } from 'src/app/modules/core/our-picks/loaders/our-picks-player.loader';
import { OurPicksPlayersLoader } from 'src/app/modules/core/our-picks/loaders/our-picks-players.loader';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { OurPicksAdminService } from 'src/app/modules/core/services/our-picks-admin.service';

@Component({
  selector: 'app-admin-our-picks-player-search',
  templateUrl: './admin-our-picks-player-search.component.html',
  styleUrls: ['./admin-our-picks-player-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOurPicksPlayerSearchComponent {
  @Input() selected: OurPicksPlayer[];
  @Input() lastMatchday: number;

  @Output() playerSelected = new EventEmitter<OurPicksPlayer>();

  public get excluded(): number[] {
    return this.selected?.map((p) => p.playerId);
  }

  constructor(private ourPicksPlayerLoader: OurPicksPlayerLoader) {}

  public onPlayerSelected(player: PlayerPicker): void {
    this.playerSelected.emit(this.ourPicksPlayerLoader.load(+player.id, this.lastMatchday));
  }
}
