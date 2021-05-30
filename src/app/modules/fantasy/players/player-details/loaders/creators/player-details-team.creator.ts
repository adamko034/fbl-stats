import { Injectable } from '@angular/core';
import { TeamTableStatsCreator } from 'src/app/modules/core/teams/builders/team-table-stats.creator';
import { TeamFormService } from 'src/app/modules/core/teams/services/team-form.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsTeam } from '../../models/player-details-team.model';

@Injectable()
export class PlayerDetailsTeamCreator {
  constructor(private teamTableStatsCreator: TeamTableStatsCreator, private TeamFormService: TeamFormService) {}

  public from(team: Team): PlayerDetailsTeam {
    return {
      longName: team.name,
      shortName: team.shortName,
      last5: this.teamTableStatsCreator.from(team, 5),
      table: this.teamTableStatsCreator.from(team),
      last5Form: this.TeamFormService.getFormString(team)
    };
  }
}
