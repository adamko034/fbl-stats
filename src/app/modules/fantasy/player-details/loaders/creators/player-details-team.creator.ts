import { Injectable } from '@angular/core';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsTeam } from '../../models/player-details-team.model';

@Injectable()
export class PlayerDetailsTeamCreator {
  public from(team: Team): PlayerDetailsTeam {
    return {
      longName: team.name,
      shortName: team.shortName,
      rank: team.rank
    };
  }
}
