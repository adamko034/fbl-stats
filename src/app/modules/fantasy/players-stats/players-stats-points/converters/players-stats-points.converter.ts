import { Injectable } from '@angular/core';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { TableCell } from 'src/app/shared/models/table-cell.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../models/players-stats-points-player.model';
import { PlayersStatsPointsType } from '../models/players-stats-points-type.enum';

@Injectable()
export class PlayersStatsPointsConverter {
  constructor(private teamService: TeamService) {}

  public convert(player: Player, team: Team, filters: PlayersStatsPointsFilters): PlayersStatsPointsPlayer {
    const { id, name, lastName, position, teamShort, price, totalPoints } = player;
    const stats = this.getStats(player, team, filters);

    return { id, name, lastName, position, teamShort, price, stats, totalPoints };
  }

  private getStats(player: Player, team: Team, filters: PlayersStatsPointsFilters): TableCell[] {
    const allStats = player.pointsStats[filters.calculations];
    const playedGames = player.games.filter((g) => g.hasPlayed);
    const playedMatchdays = playedGames.map((g) => g.matchday);
    const playedGamesCount = playedGames.length;

    if (filters.type === PlayersStatsPointsType.BUNDESLIGA) {
      const wonGamesCount = this.teamService
        .getTeamWinningMatchdays(team)
        .filter((m) => playedMatchdays.includes(m)).length;
      const drawGamesCount = this.teamService
        .getTeamDrawMatchdays(team)
        .filter((m) => playedMatchdays.includes(m)).length;
      const lostGamesCount = this.teamService
        .getTeamLostMatchdays(team)
        .filter((m) => playedMatchdays.includes(m)).length;

      return [
        { order: 1, value: playedGamesCount, header: 'GP' },
        { order: 2, value: playedGames.filter((g) => g.hasPlayedMoreThan70Min).length, header: 'GP70' },
        { order: 3, value: allStats.bundesligaGoals, header: 'G' },
        { order: 4, value: MathHelper.divideAndRound(allStats.bundesligaGoals, playedGamesCount), header: 'GpG' },
        { order: 5, value: allStats.bundesligaAssits, header: 'A' },
        { order: 6, value: MathHelper.divideAndRound(allStats.bundesligaAssits, playedGamesCount), header: 'ApG' },
        { order: 7, value: wonGamesCount, header: 'W' },
        { order: 8, value: drawGamesCount, header: 'D' },
        { order: 9, value: lostGamesCount, header: 'L' }
      ];
    }

    if (filters.type === PlayersStatsPointsType.ATTACKING) {
      return [
        { order: 0.9, header: 'GP', value: playedGamesCount },
        { order: 1, header: 'G', value: allStats.goals },
        { order: 2, header: 'GpG', value: MathHelper.divideAndRound(allStats.goals, playedGamesCount) },
        { order: 3, header: 'A', value: allStats.assists },
        { order: 4, header: 'ApG', value: MathHelper.divideAndRound(allStats.assists, playedGamesCount) },
        { order: 5, header: 'Sh', value: allStats.shotsOnGoal },
        { order: 6, header: 'ShpG', value: MathHelper.divideAndRound(allStats.shotsOnGoal, playedGamesCount) },
        { order: 7, header: '2G', value: allStats.twoGoals },
        { order: 8, header: '3G', value: allStats.threeGoals },
        { order: 9, header: 'WG', value: allStats.winningGoal },
        { order: 10, header: 'Pen', value: allStats.scoredPenalties },
        { order: 11, header: 'MPen', value: allStats.missedPenalties }
      ];
    }
  }
}
