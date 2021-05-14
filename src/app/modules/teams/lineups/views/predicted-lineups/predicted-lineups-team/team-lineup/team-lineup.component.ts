import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PredictedLineupPlayer } from 'src/app/modules/teams/lineups/store/models/predicted-lineup-player.model';
import { SourcePredictedLineups } from 'src/app/modules/teams/lineups/store/models/source-predicted-lineups.model';
import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';

@Component({
  selector: 'app-team-lineup',
  templateUrl: './team-lineup.component.html',
  styleUrls: ['./team-lineup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamLineupComponent {
  @Input() lineup: SourcePredictedLineups;

  public get goalkeeper(): string {
    return this.lineup?.goalkeeper?.lastName || '';
  }

  public get goalkeeperId(): string {
    return this.lineup?.goalkeeper?.id;
  }

  public get defenders(): PredictedLineupPlayer[] {
    return this.lineup?.defenders || [];
  }

  public get midfielders(): PredictedLineupPlayer[] {
    return this.lineup?.midfielders || [];
  }

  public get forwards(): PredictedLineupPlayer[] {
    return this.lineup?.forwards || [];
  }

  public getWingers(players: PredictedLineupPlayer[]): PredictedLineupPlayer[] {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Left || p.subPosition === PlayerSubPosition.Right);
  }

  public isMoreThanFourCentrals(players: PredictedLineupPlayer[]): boolean {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Center).length > 4;
  }

  constructor() {}
}
