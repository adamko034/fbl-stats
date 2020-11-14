import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { maxBy, minBy, orderBy } from 'lodash';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';
import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { TimelineTense } from 'src/app/shared/components/timeline/models/timeline-tense.enum';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
  @Input() items: TimelineItem[];
  @Input() options: TimelineDisplayOptions = { futureItemsCount: 2, pastItemsCount: 3 };

  private get displayedItemsCount(): number {
    return this.options.pastItemsCount + this.options.futureItemsCount + 1;
  }

  public displayedItems: TimelineItem[];
  public showTimeline = false;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (!!changes.items && changes.items.currentValue.length > 0) {
      this.setDisplayedItems();
    }
  }

  public isCurrent(item: TimelineItem): boolean {
    return item.tense === TimelineTense.CURRENT;
  }

  public isBeforeItem(): boolean {
    const minItem = minBy(this.items, 'order');
    const minDisplayedItem = minBy(this.displayedItems, 'order');
    return minItem.order < minDisplayedItem.order;
  }

  public isNextItem(): boolean {
    const maxItem = maxBy(this.items, 'order');
    const maxDispalyedItem = maxBy(this.displayedItems, 'order');
    return maxItem.order > maxDispalyedItem.order;
  }

  public onShowPrevious(): void {
    const minItem = minBy(this.items, 'order');
    const displayedMinItem = minBy(this.displayedItems, 'order');

    if (displayedMinItem.order > minItem.order) {
      const previousMin = displayedMinItem.order - 1;

      const filtered = this.items
        .filter((i) => i.order >= previousMin)
        .filter((i) => i.order < previousMin + this.displayedItemsCount);

      this.displayedItems = orderBy(filtered, 'order');
    }
  }

  public onShowNext(): void {
    const displayedMaxItem = maxBy(this.displayedItems, 'order');
    const nextMax = displayedMaxItem.order + 1;

    const filtered = this.items
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

  private setDisplayedItems(): void {
    if (!!this.items && this.items.length > 0) {
      if (this.items.length <= this.displayedItemsCount) {
        this.displayedItems = this.items;
        return;
      }

      const currentItem = this.items.find((i) => i.tense === TimelineTense.CURRENT);
      if (!currentItem) {
        return;
      }

      const filtered = this.items.filter((item) => this.itemShouldBeDisplayed(item, currentItem.order));
      this.displayedItems = orderBy(filtered, 'order');
      this.showTimeline = true;
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
