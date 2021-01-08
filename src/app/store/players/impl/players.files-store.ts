import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from 'src/app/store/files.service';
import { IPlayersStore } from 'src/app/store/players/impl/players-store.interface';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PlayersFilesStoreService implements IPlayersStore {
  constructor(private filesService: FilesService) {}

  public loadDefenders(): Observable<Player[]> {
    Logger.logDev('players files store service, loading defenders from json');
    return this.filesService.getJson<Player>('def');
  }

  public loadGoalkeepers(): Observable<Player[]> {
    Logger.logDev('players files store service, loading goalkeepers from json');
    return this.filesService.getJson<Player>('gk');
  }

  public loadMidfielders(): Observable<Player[]> {
    Logger.logDev('players files store service, loading midfielders from json');
    return this.filesService.getJson<Player>('mid');
  }

  public loadForwards(): Observable<Player[]> {
    Logger.logDev('players files store service, loading forwards from json');
    return this.filesService.getJson<Player>('for');
  }
}
