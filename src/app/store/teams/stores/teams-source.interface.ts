import { Observable } from 'rxjs';
import { Team } from 'src/app/store/teams/models/team.model';

export abstract class ITeamsSource {
  public abstract loadAll(): Observable<Team[]>;
}
