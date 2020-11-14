import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { TimelineTense } from 'src/app/shared/components/timeline/models/timeline-tense.enum';

export class TimelineItemBuilder {
  private item: TimelineItem;

  private constructor(order: number, tense: TimelineTense) {
    this.item = { order, tense };
  }

  public static from(order: number, tense: TimelineTense): TimelineItemBuilder {
    return new TimelineItemBuilder(order, tense);
  }

  public withTitle(title: string): TimelineItemBuilder {
    this.item.title = title;
    return this;
  }

  public withDescription(description: string): TimelineItemBuilder {
    this.item.description = description;
    return this;
  }

  public witDescriptionCssClass(cssClass: string): TimelineItemBuilder {
    this.item.descriptionCssClass = cssClass;
    return this;
  }

  public withDescriptionDetails(details: string): TimelineItemBuilder {
    this.item.descriptionDetails = details;
    return this;
  }

  public withImageUrl(url: string): TimelineItemBuilder {
    this.item.imageUrl = url;
    return this;
  }

  public withImageAltText(altText: string): TimelineItemBuilder {
    this.item.imageAltText = altText;
    return this;
  }

  public build(): TimelineItem {
    return this.item;
  }
}
