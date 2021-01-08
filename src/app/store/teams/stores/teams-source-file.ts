import { Observable } from 'rxjs';
import { FilesService } from 'src/app/store/files.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { ITeamsSource } from 'src/app/store/teams/stores/teams-source.interface';

export class TeamsFileSource implements ITeamsSource {
  constructor(private filesService: FilesService) {}

  public loadAll(): Observable<Team[]> {
    return this.filesService.getJson<Team>('teams');
  }
}
