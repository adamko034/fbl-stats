import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { PlayerCompareCard } from '../../models/player-compare-card.model';
import { PlayersCompareNavigationService } from '../../services/players-compare-navigation.service';

@Component({
  selector: 'app-players-compare-title',
  templateUrl: './players-compare-title.component.html',
  styleUrls: ['./players-compare-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareTitleComponent implements OnInit {
  @Input() players: PlayerCompareCard[];

  constructor(private navigationService: PlayersCompareNavigationService) {}

  ngOnInit(): void {}

  public onPlayerRemove(player: PlayerCompareCard): void {
    //this.toastrService.success(`Removed ${player.name}`);
    this.navigationService.removePlayer(player.id);
  }

  public onPlayerSelected({ id, name }: PlayerPicker): void {
    //this.toastrService.success(`Added ${name}`);
    this.navigationService.addPlayer(id.toString());
  }
}
