import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { PlayerDetailsTeam } from '../../../../models/player-details-team.model';
import { PlayerDetails } from '../../../../models/player-details.model';

@Component({
  selector: 'app-player-details-next-matchday',
  templateUrl: './player-details-next-matchday.component.html',
  styleUrls: ['./player-details-next-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsNextMatchdayComponent implements OnInit {
  @Input() player: PlayerDetails;

  public get homeTeam(): PlayerDetailsTeam {
    return this.player.nextOpponent.isHome ? this.player.team : this.player.nextOpponent.team;
  }

  public get awayTeam() {
    return this.player.nextOpponent.isHome ? this.player.nextOpponent.team : this.player.team;
  }

  constructor() {}

  ngOnInit(): void {}
}
