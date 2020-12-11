import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { maxBy, minBy, orderBy } from 'lodash';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';
import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { TimelineTense } from 'src/app/shared/components/timeline/models/timeline-tense.enum';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() set items(timelineItems: TimelineItem[]) {
    if (timelineItems.length > 0) {
      Logger.logDev('timeline component, got items, calculating displayed items');
      this.allItems = timelineItems;
      this.setDisplayedItems(timelineItems);
    }
  }

  private options: TimelineDisplayOptions = { futureItemsCount: 2, pastItemsCount: 3 };
  private allItems: TimelineItem[];

  private get displayedItemsCount(): number {
    return this.options.pastItemsCount + this.options.futureItemsCount + 1;
  }

  public displayedItems: TimelineItem[];
  public showTimeline = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (window.innerWidth < 500) {
      this.options = { futureItemsCount: 2, pastItemsCount: 1 };
    }

    if (window.innerWidth < 360) {
      this.options = { futureItemsCount: 1, pastItemsCount: 0 };
    }
  }

  public trackItemsBy(index, item: TimelineItem): number {
    return item.order;
  }

  public isCurrent(item: TimelineItem): boolean {
    return item.tense === TimelineTense.CURRENT;
  }

  public isBeforeItem(): boolean {
    const minItem = minBy(this.allItems, 'order');
    const minDisplayedItem = minBy(this.displayedItems, 'order');
    return minItem.order < minDisplayedItem.order;
  }

  public isNextItem(): boolean {
    const maxItem = maxBy(this.allItems, 'order');
    const maxDispalyedItem = maxBy(this.displayedItems, 'order');
    return maxItem.order > maxDispalyedItem.order;
  }

  public onShowPrevious(): void {
    const minItem = minBy(this.allItems, 'order');
    const displayedMinItem = minBy(this.displayedItems, 'order');

    if (displayedMinItem.order > minItem.order) {
      const previousMin = displayedMinItem.order - 1;

      const filtered = this.allItems
        .filter((i) => i.order >= previousMin)
        .filter((i) => i.order < previousMin + this.displayedItemsCount);

      this.displayedItems = orderBy(filtered, 'order');
    }
  }

  public onShowNext(): void {
    const displayedMaxItem = maxBy(this.displayedItems, 'order');
    const nextMax = displayedMaxItem.order + 1;

    const filtered = this.allItems
      .filter((i) => i.order <= nextMax)
      .filter((i) => i.order > nextMax - this.displayedItemsCount);

    this.displayedItems = orderBy(filtered, 'order');
  }

  public getTenseClassWithPrefix(item: TimelineItem, prefix: string): string {
    return `${prefix}-${item.tense.toString()}`;
  }

  public getDescriptionCssClasses(item: TimelineItem): string {
    return `${!!item.descriptionCssClass ? item.descriptionCssClass : ''} ${this.getTenseClassWithPrefix(
      item,
      'description'
    )}`;
  }

  private setDisplayedItems(items: TimelineItem[]): void {
    if (!!items && items.length > 0) {
      if (items.length <= this.displayedItemsCount) {
        this.displayedItems = items;
        return;
      }

      const currentItem = items.find((i) => i.tense === TimelineTense.CURRENT);
      if (!currentItem) {
        return;
      }

      const filtered = items.filter((item) => this.itemShouldBeDisplayed(item, currentItem.order));
      this.displayedItems = orderBy(filtered, 'order');
      this.showTimeline = true;
      this.changeDetector.detectChanges();
    }
  }

  private itemShouldBeDisplayed(item: TimelineItem, currentItemIndex: number): boolean {
    return (
      item.order === currentItemIndex ||
      (item.order < currentItemIndex && item.order >= currentItemIndex - this.options.pastItemsCount) ||
      (item.order > currentItemIndex && item.order <= currentItemIndex + this.options.futureItemsCount)
    );
  }
}
