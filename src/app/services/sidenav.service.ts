import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreenSizeService } from './screen-size.service';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _opened$: BehaviorSubject<boolean>;

  public get opened$(): Observable<boolean> {
    return this._opened$;
  }

  constructor(private screenSizeService: ScreenSizeService) {
    this._opened$ = new BehaviorSubject(!this.screenSizeService.isMobile());
  }

  public closeOnMobile(): void {
    if (this.screenSizeService.isMobile()) {
      this._opened$.next(false);
    }
  }

  public toggle(): void {
    this._opened$.next(!this._opened$.getValue());
  }
}
