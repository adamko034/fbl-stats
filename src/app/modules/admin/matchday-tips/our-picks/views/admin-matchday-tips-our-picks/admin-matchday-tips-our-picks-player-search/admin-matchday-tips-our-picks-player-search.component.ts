import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchdayTipsOurPicksPlayerLoader } from 'src/app/modules/core/matchday-tips/our-picks/loaders/matchday-tips-our-picks-player.loader';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';

@Component({
  selector: 'app-admin-our-picks-player-search',
  templateUrl: './admin-matchday-tips-our-picks-player-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMatchdayTipsOurPicksPlayerSearchComponent {
  @Input() selected: MatchdayTipsOurPicksPlayer[];
  @Input() lastMatchday: number;

  @Output() playerSelected = new EventEmitter<MatchdayTipsOurPicksPlayer>();

  public get excluded(): number[] {
    if (!this.selected) {
      return [];
    }
    return this.selected.map((p) => p.playerId);
  }

  constructor(private ourPicksPlayerLoader: MatchdayTipsOurPicksPlayerLoader) {}

  public onPlayerSelected(player: PlayerPicker): void {
    this.playerSelected.emit(this.ourPicksPlayerLoader.load(+player.id, this.lastMatchday));
  }
}
