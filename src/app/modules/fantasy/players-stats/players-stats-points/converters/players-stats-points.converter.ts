import { Injectable } from '@angular/core';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { CalculationsType } from 'src/app/shared/models/calculations-type.enum';
import { TableCell } from 'src/app/shared/models/table-cell.model';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayersStatsPointsFilters } from '../models/players-stats-points-filters.model';
import { PlayersStatsPointsPlayer } from '../models/players-stats-points-player.model';
import { PlayersStatsPointsSubType } from '../models/players-stats-points-subtype.enum';
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
    let playedGames = player.games.filter((g) => g.hasPlayed);

    if (filters.calculations === CalculationsType.LAST5) {
      playedGames = new ArrayStream<Game>(player.games)
        .orderBy('matchday', 'dsc')
        .take(5)
        .filterQuick((g) => g.hasPlayed)
        .collect();
    }

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
        { order: 1, value: playedGamesCount, header: 'GP', description: 'Games played' },
        {
          order: 2,
          value: playedGames.filter((g) => g.hasPlayedMoreThan70Min).length,
          header: 'GP70',
          description: 'Games played 70min'
        },
        { order: 3, value: allStats.bundesligaGoals, header: 'G', description: 'Goals', defaultSort: true },
        {
          order: 4,
          value: MathHelper.divideAndRound(allStats.bundesligaGoals, playedGamesCount),
          header: 'GpG',
          description: 'Goals per game'
        },
        { order: 5, value: allStats.bundesligaAssits, header: 'A', description: 'Assists' },
        {
          order: 6,
          value: MathHelper.divideAndRound(allStats.bundesligaAssits, playedGamesCount),
          header: 'ApG',
          description: 'Assists per game'
        },
        { order: 7, value: allStats.bundesligaShotsOnGoals, header: 'Sh', description: 'Shots on goal' },
        {
          order: 8,
          value: MathHelper.divideAndRound(allStats.bundesligaShotsOnGoals, playedGamesCount),
          header: 'ShpGa',
          description: 'Shots on goal per game'
        },
        {
          order: 9,
          value: MathHelper.divideAndRound(allStats.bundesligaShotsOnGoals, allStats.bundesligaGoals),
          header: 'ShpGo',
          description: 'Shots on goal per goal'
        },
        { order: 10, value: allStats.bundesligaYellowCards, header: 'Y', description: 'Yellow cards' },
        { order: 11, value: allStats.bundesligaRedCards, header: 'R', description: 'Red cards' },
        { order: 12, hideOnMd: true, value: wonGamesCount, header: 'W', description: 'Games won' },
        { order: 13, hideOnMd: true, value: drawGamesCount, header: 'D', description: 'Games draw' },
        { order: 14, hideOnMd: true, value: lostGamesCount, header: 'L', description: 'Games lost' }
      ];
    }

    if (filters.type === PlayersStatsPointsType.FANTASY && filters.subType === PlayersStatsPointsSubType.ATTACKING) {
      return [
        { order: 0.9, header: 'GP', value: playedGamesCount, description: 'Games played' },
        { order: 1, header: 'G', value: allStats.goals, description: 'Goals', includeInTotal: true },
        {
          order: 2,
          header: 'GpG',
          value: MathHelper.divideAndRound(allStats.goals, playedGamesCount),
          description: 'Goals per game',
          defaultSort: true
        },
        { order: 3, header: 'A', value: allStats.assists, description: 'Assists', includeInTotal: true },
        {
          order: 4,
          header: 'ApG',
          value: MathHelper.divideAndRound(allStats.assists, playedGamesCount),
          description: 'Assists per game'
        },
        {
          order: 5,
          header: 'Sh',
          value: allStats.shotsOnGoal,
          description: 'Shots on goal',
          includeInTotal: true
        },
        {
          order: 6,
          header: 'ShpG',
          value: MathHelper.divideAndRound(allStats.shotsOnGoal, playedGamesCount),
          description: 'Shots on goal per game'
        },
        {
          order: 6.5,
          header: 'PtS',
          value: allStats.passesToShot,
          description: 'Passes to shot',
          includeInTotal: true
        },
        { order: 7, header: '2G', value: allStats.twoGoals, description: 'Two goals', includeInTotal: true },
        { order: 8, header: '3G', value: allStats.threeGoals, description: 'Three goals', includeInTotal: true },
        {
          order: 9,
          header: 'WG',
          value: allStats.winningGoal,
          description: 'Winning goal',
          includeInTotal: true
        },
        {
          order: 10,
          header: 'Pen',
          value: allStats.scoredPenalties,
          description: 'Converted penalties',
          includeInTotal: true
        },
        {
          order: 11,
          header: 'MPen',
          value: allStats.missedPenalties,
          description: 'Missed penalties',
          includeInTotal: true
        }
      ];
    }

    if (filters.type === PlayersStatsPointsType.FANTASY && filters.subType === PlayersStatsPointsSubType.DEFENCE) {
      return [
        { order: 1, header: 'GP', value: playedGamesCount, description: 'Games played' },
        { order: 2, header: 'WD', value: allStats.wonDuels, description: 'Won duels', includeInTotal: true },
        {
          order: 3,
          header: 'WDpG',
          value: MathHelper.divideAndRound(allStats.wonDuels, playedGamesCount),
          description: 'Won duels per game',
          defaultSort: true
        },
        {
          order: 4,
          header: 'GC',
          value: allStats.goalsConceeded,
          description: 'Goals conceded',
          includeInTotal: true
        },
        { order: 5, header: 'CS', value: allStats.cleanSheet, description: 'Clean sheet', includeInTotal: true },
        {
          order: 6,
          header: 'CPen',
          value: allStats.causedPenalities,
          description: 'Caused penalties',
          includeInTotal: true
        },
        {
          order: 7,
          header: 'ShS',
          value: allStats.shotsSaved,
          description: 'Shots saved',
          includeInTotal: true
        },
        {
          order: 8,
          header: 'ShSpG',
          value: MathHelper.divideAndRound(allStats.shotsSaved, playedGamesCount),
          description: 'Shots saved per game'
        },
        { order: 9, header: 'SPen', value: allStats.penaltySaved, description: 'Saved penalties' }
      ];
    }

    if (filters.type === PlayersStatsPointsType.FANTASY && filters.subType === PlayersStatsPointsSubType.GENERAL) {
      return [
        { order: 1, header: 'GP', value: playedGamesCount, description: 'Games played' },
        {
          order: 2,
          header: 'PM',
          value: allStats.playedMinutes,
          description: 'Played minutes',
          defaultSort: true,
          includeInTotal: true
        },
        {
          order: 3,
          header: 'WT',
          value: allStats.winningTeam,
          description: 'Winning team',
          includeInTotal: true
        },
        {
          order: 4,
          header: 'LT',
          value: allStats.loosingTeam,
          description: 'Loosing team',
          includeInTotal: true
        },
        { order: 5, header: 'Y', value: allStats.yellowCard, description: 'Yellow card', includeInTotal: true },
        {
          order: 6,
          header: 'SY',
          value: allStats.secondYellowCard,
          description: 'Second yellow card',
          includeInTotal: true
        },
        { order: 7, header: 'R', value: allStats.redCard, description: 'Red card', includeInTotal: true },
        { order: 8, header: 'OG', value: allStats.ownGoals, description: 'Own goal', includeInTotal: true }
      ];
    }
  }
}
