import { Injectable } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export enum ScreenSize {
  XXS = 0,
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5,
  XXL = 6
}

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  private resize$: ReplaySubject<ScreenSize>;

  public onResize(): Observable<ScreenSize> {
    if (!this.resize$) {
      this.resize$ = new ReplaySubject(1);
      this.resize$.next(this.mapToScreenSize());

      fromEvent(window, 'resize')
        .pipe(
          map(() => this.mapToScreenSize()),
          distinctUntilChanged()
        )
        .subscribe((screen) => this.resize$.next(screen));
    }

    return this.resize$.asObservable();
  }

  public isMobile$(): Observable<boolean> {
    return this.onResize().pipe(
      map((screenSize) => screenSize <= ScreenSize.XS),
      distinctUntilChanged()
    );
  }

  public isMobile(): boolean {
    return this.mapToScreenSize() <= ScreenSize.XS;
  }

  public currentSize(): ScreenSize {
    return this.mapToScreenSize();
  }

  private mapToScreenSize(): ScreenSize {
    const width = window.screen.width;
    if (width < 400) {
      return ScreenSize.XXS;
    } else if (width < 640) {
      return ScreenSize.XS;
    } else if (width < 768) {
      return ScreenSize.SM;
    } else if (width < 1024) {
      return ScreenSize.MD;
    } else if (width < 1280) {
      return ScreenSize.LG;
    } else if (width < 1536) {
      return ScreenSize.XL;
    } else {
      return ScreenSize.XXL;
    }
  }
}
