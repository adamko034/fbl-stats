import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamGameAgainstConfig } from 'src/app/shared/components/team-game-against/team-game-against-config.model';
import { TeamGameAgainst } from 'src/app/shared/components/team-game-against/team-game-against.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-games-next',
  templateUrl: './players-compare-games-next.component.html',
  styleUrls: ['./players-compare-games-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareGamesNextComponent implements OnChanges {
  @Input() matchdays: number;
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;

  private _teamAgainstConfig: TeamGameAgainstConfig = {
    showFirstGame: true,
    showStandalone: true,
    teamLogoHeight: 17,
    smallerFont: true,
    boldTextIfHome: true,
    showFistGameOrStandaloneInSecondRow: true,
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
    if (changes.matchdays?.currentValue && this.lastMatchday != null) {
      this._mds = [];
      for (let md = this.lastMatchday + 1; md <= this.lastMatchday + this.matchdays; md++) {
        this._mds.push(md);
      }
    }
  }

  public getTeamDifficultClass(player: Player, md: number): string {
    const teamGame = this.teams[player.teamShort].games.find((g) => g.matchday === md);

    if (!teamGame) {
      return '';
    }

    const opponentRank = teamGame.opponentRank;

    if (opponentRank <= 3) {
      return 'game-dark-red';
    } else if (opponentRank <= 6) {
      return 'game-red';
    } else if (opponentRank <= 9) {
      return 'game-orange';
    } else if (opponentRank <= 12) {
      return 'game-yellow';
    } else if (opponentRank <= 15) {
      return 'game-green-light';
    } else {
      return 'game-green';
    }
  }

  public getTeamAgainst(player: Player, md: number): TeamGameAgainst {
    const teamGame = this.teams[player.teamShort].games.find((g) => g.matchday === md);

    return {
      md,
      shortName: teamGame?.opponent,
      rank: teamGame?.opponentRank,
      isHome: teamGame?.isHome,
      isFirstGame: teamGame?.isMatchdayFirstGame,
      isStandalone: teamGame?.isStandaloneFixture,
      isPostponed: teamGame?.wasPostponed
    };
  }
}
