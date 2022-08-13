import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamGameAgainstConfig } from 'src/app/shared/components/team-game-against/team-game-against-config.model';
import { TeamGameAgainst } from 'src/app/shared/components/team-game-against/team-game-against.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-games-previous',
  templateUrl: './players-compare-games-previous.component.html',
  styleUrls: ['./players-compare-games-previous.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareGamesPreviousComponent implements OnChanges {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() matchdays: number;
  @Input() lastMatchday: number;

  private _teamAgainstConfig: TeamGameAgainstConfig = {
    showFirstGame: false,
    teamLogoHeight: 17,
    smallerFont: true,
    showResult: true,
    showPoints: true,
    showPostponed: true
  };
  public get teamAgainstConfig(): TeamGameAgainstConfig {
    return this._teamAgainstConfig;
  }

  private _mds: number[] = [];
  public get mds(): number[] {
    return this._mds;
  }

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.lastMatchday != 0 && changes.matchdays?.currentValue != 0) {
      this._mds = [];
      for (let md = this.lastMatchday; md > this.lastMatchday - this.matchdays; md--) {
        this._mds.push(md);
      }
    }
  }

  public getTeamAgainst(player: Player, md: number): TeamGameAgainst {
    const teamGame = this.teams[player.teamShort].games.find((g) => g.matchday === md);
    const playerGame = player.games.find((g) => g.matchday === md);

    return {
      md,
      shortName: teamGame?.opponent,
      rank: teamGame?.opponentRank,
      isHome: teamGame?.isHome,
      result: teamGame?.resultText,
      points: playerGame?.points,
      isPostponed: teamGame?.wasPostponed
    };
  }

  public getWinLostCssClass(player: Player, md: number) {
    const playerGame = player.games.find((g) => g.matchday === md);

    if (playerGame?.result === 1) {
      return 'win';
    }

    if (playerGame?.result === -1) {
      return 'lost';
    }

    return 'other';
  }
}
