import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerSubPosition } from 'src/app/store/players/models/palyer-subposition.enum';
import { LineupPlayer } from './models/lineup-player.model';
import { Lineup } from './models/lineup.model';

@Component({
  selector: 'app-team-lineup',
  templateUrl: './team-lineup.component.html',
  styleUrls: ['./team-lineup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamLineupComponent implements OnInit {
  @Input() lineup: Lineup;

  public get goalkeeper(): LineupPlayer {
    return this.lineup.goalkeeper;
  }

  public get defenders(): LineupPlayer[] {
    return this.lineup.defenders || [];
  }

  public get midfielders(): LineupPlayer[] {
    return this.lineup.midfielders || [];
  }

  public get forwards(): LineupPlayer[] {
    return this.lineup.forwards || [];
  }

  constructor() {}

  ngOnInit(): void {}

  public getWingers(players: LineupPlayer[]): LineupPlayer[] {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Left || p.subPosition === PlayerSubPosition.Right);
  }

  public isMoreThanFourCentrals(players: LineupPlayer[]): boolean {
    return players.filter((p) => p.subPosition === PlayerSubPosition.Center).length > 4;
  }
}
