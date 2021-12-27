import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TeamGameAgainstConfig } from './team-game-against-config.model';
import { TeamGameAgainst } from './team-game-against.model';

@Component({
  selector: 'app-team-game-against',
  templateUrl: './team-game-against.component.html',
  styleUrls: ['./team-game-against.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamGameAgainstComponent implements OnInit {
  private _config: TeamGameAgainstConfig;

  @Input() team: TeamGameAgainst;
  @Input() public set config(value: TeamGameAgainstConfig) {
    this._config = value;
  }

  public get config(): TeamGameAgainstConfig {
    return {
      smallerFont: false,
      showMdLabel: false,
      showRank: true,
      teamLogoHeight: 20,
      showFirstGame: true,
      ...this._config
    };
  }

  public get showMdLabel(): boolean {
    return this.config.showMdLabel;
  }

  constructor() {}

  ngOnInit(): void {}
}
