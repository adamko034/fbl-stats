import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _prefix = 'FANTASY_FBL_STATS:';
  public upsert<T>(key: string, data: T): void {
    localStorage.setItem(`${this._prefix}${key}`, JSON.stringify(data));
  }

  public get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(`${this._prefix}${key}`)) as T;
  }
}
