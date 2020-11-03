import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public upsert<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
}
