import { Injectable } from '@angular/core';
import { MatrixTableColumn } from 'src/app/common/components/ui/matrix-table/models/matrix-table-column.model';
import { MatrixTableRow } from 'src/app/common/components/ui/matrix-table/models/matrix-table-row.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsKickoffTimesService } from './teams-kickoff-times.service';

@Injectable()
export class TeamsKickoffTimesMatrixTableRowsFabric {
  constructor(private kickOffTimesService: TeamsKickoffTimesService) {}

  public from(teams: Team[], nextMatchday: number, includeMatchdays: number): MatrixTableRow[] {
    const rows: MatrixTableRow[] = [];
    teams.forEach((team) => {
      const columns: MatrixTableColumn[] = [];

      teams.forEach((otherTeam) => {
        if (otherTeam.shortName === team.shortName) {
          columns.push({ id: otherTeam.shortName, text: '--', order: otherTeam.rank });
        } else {
          const untillMatchday = nextMatchday + includeMatchdays - 1;
          const differentKickOffTimes = this.kickOffTimesService.getDifferentKickoffTimes(
            team,
            otherTeam,
            nextMatchday,
            untillMatchday
          );

          columns.push({
            text: differentKickOffTimes.length.toString(),
            id: otherTeam.shortName,
            order: otherTeam.rank
          });
        }
      });

      rows.push({ columns, id: team.shortName, order: team.rank, text: team.shortName });
    });

    return rows;
  }
}
