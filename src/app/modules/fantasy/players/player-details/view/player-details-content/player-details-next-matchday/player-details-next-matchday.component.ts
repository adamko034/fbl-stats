import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerPredictionCombined } from 'src/app/common/players/models/player-prediction-combined.enum';
import { PlayerDetailsTeam } from '../../../models/player-details-team.model';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-next-matchday',
  templateUrl: './player-details-next-matchday.component.html',
  styleUrls: ['./player-details-next-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsNextMatchdayComponent implements OnInit {
  @Input() player: PlayerDetails;

  public get homeTeam(): PlayerDetailsTeam {
    return this.player.nextGame.isHome ? this.player.team : this.player.nextGame.opponent;
  }

  public get awayTeam() {
    return this.player.nextGame.isHome ? this.player.nextGame.opponent : this.player.team;
  }

  public predictions = PlayerPredictionCombined;

  constructor() {}

  ngOnInit(): void {}
}
