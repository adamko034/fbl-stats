import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private opened$ = new ReplaySubject<boolean>(1);

  public selectOpened(): Observable<boolean> {
    return this.opened$.pipe(startWith(false), distinctUntilChanged());
  }

  public close(): void {
    this.opened$.next(false);
  }

  public open(): void {
    this.opened$.next(true);
  }
}
