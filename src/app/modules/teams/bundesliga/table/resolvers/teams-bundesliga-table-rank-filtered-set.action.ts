import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TeamsBundesligaTableTeam } from '../models/teams-bundesliga-table-team.model';

export class TeamsBundesligaTableRankFilteredSetAction implements Actionable<TeamsBundesligaTableTeam> {
  public exec(items: TeamsBundesligaTableTeam[]): TeamsBundesligaTableTeam[] {
    let order = 1;

    return new ArrayStream<TeamsBundesligaTableTeam>(items)
      .orderByThenBy(
        { field: 'points', order: 'dsc' },
        { field: 'goalsDiff', order: 'dsc' },
        { field: 'goalsScored', order: 'dsc' }
      )
      .forEachQuick((team) => (team.rankFiltered = order++))
      .collect();
  }
}
