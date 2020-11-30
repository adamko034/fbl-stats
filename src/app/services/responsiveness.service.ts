import { Injectable } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export enum ScreenSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

@Injectable({ providedIn: 'root' })
export class ResponsivenessService {
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

  private mapToScreenSize(): ScreenSize {
    const width = window.innerWidth;
    if (width < 600) {
      return ScreenSize.XS;
    } else if (width < 960) {
      return ScreenSize.SM;
    } else if (width < 1280) {
      return ScreenSize.MD;
    } else if (width < 1920) {
      return ScreenSize.LG;
    } else {
      return ScreenSize.XL;
    }
  }
}
