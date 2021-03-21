import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { TimelineMatchdayItem } from './models/timeline-matchday-item.model';

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

    this.screenSizeService.isMobile$().subscribe((isMobile) => {
      const count = isMobile ? 3 : 5;
      this.filterItems(count);
      this.changeDetection.detectChanges();
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