import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerPredictionsService } from 'src/app/common/players/services/player-predictions.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-bundesliga-fixture-details-lineups',
  templateUrl: './bundesliga-fixture-details-lineups.component.html',
  styleUrls: ['./bundesliga-fixture-details-lineups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsLineupsComponent {
  @Input() set homeTeamPlayers(value: Player[]) {
    this._homePlayers = this.playerPredictionsService.onlyWithAtLeastOneStart(value);
  }
  @Input() set awayTeamPlayers(value: Player[]) {
    this._awayPlayers = this.playerPredictionsService.onlyWithAtLeastOneStart(value);
  }

  private _homePlayers: Player[];
  public get homePlayers(): Player[] {
    return this._homePlayers;
  }

  private _awayPlayers: Player[];
  public get awayPlayers(): Player[] {
    return this._awayPlayers;
  }

  constructor(private playerPredictionsService: PlayerPredictionsService) {}
}
