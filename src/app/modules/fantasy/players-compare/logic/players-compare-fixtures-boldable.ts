import { BoldableValuesCalculator } from 'src/app/modules/core/boldable-values/boldable-values-calculator';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayersCompareFixturesKey } from '../view/players-compare-fixtures/players-compare-fixtures-details/players-compare-fixtures-key.enum';

export class PlayersCompareFixturesBoldableCalculator extends BoldableValuesCalculator<Player> {
  constructor(
    private teamService: TeamService,
    private teams: { [team: string]: Team },
    private nextMatchday: number,
    private matchdaysCount: number
  ) {
    super();
  }

  public calculateValue(key: string, item: Player): number {
    const toMatchday = this.matchdaysCount === 0 ? null : this.matchdaysCount;
    let fixtures: Fixture[] = [];

    switch (key) {
      case PlayersCompareFixturesKey.FIRST_GAMES:
        fixtures = this.teamService.getFirstGames(this.teams[item.teamShort], this.nextMatchday, toMatchday);
        break;
      case PlayersCompareFixturesKey.STANDALONE:
        fixtures = this.teamService.getStandaloneGames(this.teams[item.teamShort], this.nextMatchday, toMatchday);
        break;
      case PlayersCompareFixturesKey.HOME:
        fixtures = this.teamService.getGamesByVenue(this.teams[item.teamShort], 'h', this.nextMatchday, toMatchday);
        break;
      case PlayersCompareFixturesKey.AWAY:
        fixtures = this.teamService.getGamesByVenue(this.teams[item.teamShort], 'a', this.nextMatchday, toMatchday);
        break;
      case PlayersCompareFixturesKey.VS_TOP:
        fixtures = this.teamService.getGamesByOpponentRank(
          this.teams[item.teamShort],
          'top6',
          this.nextMatchday,
          toMatchday
        );
        break;
      case PlayersCompareFixturesKey.VS_BOTTOM:
        fixtures = this.teamService.getGamesByOpponentRank(
          this.teams[item.teamShort],
          'bottom6',
          this.nextMatchday,
          toMatchday
        );
        break;
    }

    return fixtures.length;
  }

  public getItemId(item: Player): string {
    return item.id;
  }
}
