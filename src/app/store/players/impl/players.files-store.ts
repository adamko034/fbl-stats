import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayersStore } from 'src/app/store/players/impl/players-store.interface';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PlayersFilesStoreService implements IPlayersStore {
  private readonly baseUrl = 'assets/db/';

  constructor(private http: HttpClient) {}

  public loadDefenders(): Observable<Player[]> {
    Logger.logDev('players files store service, loading defenders from json');
    return this.getJson('def');
  }

  public loadGoalkeepers(): Observable<Player[]> {
    Logger.logDev('players files store service, loading goalkeepers from json');
    return this.getJson('gk');
  }

  public loadMidfielders(): Observable<Player[]> {
    Logger.logDev('players files store service, loading midfielders from json');
    return this.getJson('mid');
  }

  public loadForwards(): Observable<Player[]> {
    Logger.logDev('players files store service, loading forwards from json');
    return this.getJson('for');
  }

  private getJson(fileName: string): Observable<Player[]> {
    const salt = new Date().getTime();
    return this.http.get<Player[]>(`${this.baseUrl}${fileName}.json?${salt}`);
  }
}
