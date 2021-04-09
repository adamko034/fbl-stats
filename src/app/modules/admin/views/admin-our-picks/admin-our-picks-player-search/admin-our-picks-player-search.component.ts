import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OurPicksPlayerLoader } from 'src/app/modules/core/our-picks/loaders/our-picks-player.loader';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';

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
