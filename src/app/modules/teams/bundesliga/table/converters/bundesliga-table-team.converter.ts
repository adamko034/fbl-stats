import { Injectable } from '@angular/core';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Team } from 'src/app/store/teams/models/team.model';
import { BundesligaTableTeam } from '../models/bundesliga-table-team.model';

@Injectable()
export class BundesligaTableTeamConverter implements Convertable<Team, BundesligaTableTeam> {
  public convert(teams: Team[]): BundesligaTableTeam[] {
    return teams.map((t) => ({
      ...t,
      gspg: Math.round((t.goalsScored / t.gamesPlayed) * 10) / 10,
      gcpg: Math.round((t.goalsConceded / t.gamesPlayed) * 10) / 10
    }));
  }
}
