import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { TimelineMatchdayItem } from './models/timeline-matchday-item.model';

@UntilDestroy()
@Component({
  selector: 'app-timeline-matchdays',
  templateUrl: './timeline-matchdays.component.html',
  styleUrls: ['./timeline-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineMatchdaysComponent implements OnInit {
  @Input() items: TimelineMatchdayItem[];
  @Input() order: 'asc' | 'dsc' = 'dsc';

  private min: number;
  private max: number;

  public displayedItems: TimelineMatchdayItem[];

  public get isMin(): boolean {
    return this.getDisplayedMin() === this.min;
  }

  public get isMax(): boolean {
    return this.getDisplayedMax() === this.max;
  }

  public get orderBy(): string {
    return this.order === 'dsc' ? '-matchday' : 'matchday';
  }

  constructor(
    private playersDataService: PlayersDataService,
    private screenSizeService: ScreenSizeService,
    private changeDetection: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.min = new ArrayStream<TimelineMatchdayItem>(this.items, false).minBy((item) => item.matchday);
    this.max = new ArrayStream<TimelineMatchdayItem>(this.items, false).maxBy((item) => item.matchday);

    this.setDisplayedItems(this.screenSizeService.currentSize());

    this.screenSizeService
      .onResize()
      .pipe(untilDestroyed(this))
      .subscribe((screenSize) => {
        this.setDisplayedItems(screenSize);
      });
  }

  public previousMatchdays(): void {
    this.displayedItems = this.items.filter(
      (x) => x.matchday >= this.getDisplayedMin() - 1 && x.matchday <= this.getDisplayedMax() - 1
    );
  }

  public nextMatchdays(): void {
    this.displayedItems = this.items.filter(
      (x) => x.matchday <= this.getDisplayedMax() + 1 && x.matchday >= this.getDisplayedMin() + 1
    );
  }

  public getPointsCssClass(points: number): string {
    return this.playersDataService.getPointsColor(points);
  }

  private setDisplayedItems(screenSize: ScreenSize): void {
    let count = 5;

    if (screenSize <= ScreenSize.XS) {
      count = 3;
    } else if (screenSize === ScreenSize.SM) {
      count = 5;
    } else if (screenSize === ScreenSize.MD) {
      count = 6;
    } else if (screenSize === ScreenSize.LG) {
      count = 7;
    } else if (screenSize >= ScreenSize.XL) {
      count = 10;
    }

    this.filterItems(count);
    this.changeDetection.detectChanges();
  }

  private filterItems(count: number): void {
    this.displayedItems = new ArrayStream<TimelineMatchdayItem>(this.items)
      .orderBy('matchday', this.order)
      .take(count)
      .collect();
  }

  private getDisplayedMin(): number {
    return new ArrayStream<TimelineMatchdayItem>(this.displayedItems, false).minBy((item) => item.matchday);
  }

  private getDisplayedMax(): number {
    return new ArrayStream<TimelineMatchdayItem>(this.displayedItems, false).maxBy((item) => item.matchday);
  }
}
