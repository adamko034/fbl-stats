import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@UntilDestroy()
@Component({
  selector: 'app-leaders-navigation',
  templateUrl: './leaders-navigation.component.html',
  styleUrls: ['./leaders-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersNavigationComponent implements OnInit {
  private matchdays: number[];
  private matchdaysCountToDisplay = 5;

  public matchdayText = 'Matchday';
  public matchdaysToDisplay: number[];
  public isMax: boolean;
  public isMin: boolean;

  constructor(
    private route: ActivatedRoute,
    private screenSizeService: ScreenSizeService,
    private changeDetection: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    combineLatest([this.route.data, this.screenSizeService.onResize()])
      .pipe(
        distinctUntilChanged(),
        map(([data, screenSize]) => ({ matchdays: data.matchdaysNumbers, screenSize })),
        untilDestroyed(this)
      )
      .subscribe((res: { matchdays: number[]; screenSize: ScreenSize }) => {
        this.matchdays = res.matchdays.sort((a, b) => b - a);
        this.matchdayText = 'Matchday';

        if (res.screenSize >= ScreenSize.MD) {
          this.matchdaysCountToDisplay = 5;
        }

        if (res.screenSize < ScreenSize.MD) {
          this.matchdaysCountToDisplay = 5;
          this.matchdayText = 'MD';
        }

        if (res.screenSize < ScreenSize.SM) {
          this.matchdaysCountToDisplay = 2;
        }

        this.matchdaysToDisplay = this.matchdays.slice(0, this.matchdaysCountToDisplay);
        this.calculateMinAndMax();

        this.changeDetection.detectChanges();
      });
  }

  public nextMatchdays() {
    const nextMatchday = Math.max(...this.matchdaysToDisplay) + 1;
    this.matchdaysToDisplay = this.matchdays.filter(
      (x) => x <= nextMatchday && x > nextMatchday - this.matchdaysCountToDisplay
    );

    this.calculateMinAndMax();
  }

  public previousMatchdays() {
    const previous = this.matchdaysToDisplay[1];
    this.matchdaysToDisplay = this.matchdays.filter(
      (x) => x <= previous && x > previous - this.matchdaysCountToDisplay
    );
    this.calculateMinAndMax();
  }

  private calculateMinAndMax() {
    this.isMax = Math.max(...this.matchdays) === Math.max(...this.matchdaysToDisplay);
    this.isMin = Math.min(...this.matchdays) === Math.min(...this.matchdaysToDisplay);
  }
}
