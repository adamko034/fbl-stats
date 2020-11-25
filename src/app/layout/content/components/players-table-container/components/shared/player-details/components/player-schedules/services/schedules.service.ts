import { Injectable } from '@angular/core';
import { orderBy } from 'lodash';
import { DateService } from 'src/app/services/date.service';
import { TimelineItemBuilder } from 'src/app/shared/components/timeline/models/timeline-item.builder';
import { TimelineItem } from 'src/app/shared/components/timeline/models/timeline-item.model';
import { TimelineTense } from 'src/app/shared/components/timeline/models/timeline-tense.enum';
import { Fixture } from 'src/app/store/teams/models/fixture.model';

@Injectable({ providedIn: 'root' })
export class SchedulesService {
  constructor(private dateService: DateService) {}

  public toTimelineItems(fixtures: Fixture[], lastMatchday: number): TimelineItem[] {
    const timelineItems: TimelineItem[] = [];
    const sorted: Fixture[] = orderBy(fixtures, 'matchday');

    sorted.forEach((fixture: Fixture) => timelineItems.push(this.toTimelineItem(fixture, lastMatchday)));
    return timelineItems;
  }

  public getFixtureTense(fixture: Fixture, lastMatchday: number): TimelineTense {
    if (fixture.matchday <= lastMatchday) {
      return TimelineTense.PAST;
    }

    if (fixture.matchday === lastMatchday + 1) {
      return TimelineTense.CURRENT;
    }

    return TimelineTense.FUTURE;
  }

  public getHomeOrAwayText(fixture: Fixture): string {
    return fixture.isHome ? 'home' : 'away';
  }

  private toTimelineItem(fixture: Fixture, lastMatchday: number): TimelineItem {
    return TimelineItemBuilder.from(fixture.matchday, this.getFixtureTense(fixture, lastMatchday))
      .withTitle(fixture.matchday.toString())
      .withTeamShort(fixture.opponent)
      .withDescription(this.getDescription(fixture, lastMatchday))
      .witDescriptionCssClass(this.getDescriptionCssClass(fixture))
      .withDescriptionDetails(this.getHomeOrAwayText(fixture))
      .build();
  }

  private getDescription(fixture: Fixture, lastMatchday: number) {
    return fixture.matchday <= lastMatchday && !!fixture.resultText
      ? fixture.resultText
      : this.dateService.formatOrDefault(fixture.date, 'DD/MM', 'TBD');
  }

  private getDescriptionCssClass(fixture: Fixture): string {
    switch (fixture.result) {
      case -1: {
        return 'points-red';
      }
      case 0: {
        return 'points-black';
      }
      case 1: {
        return 'points-green';
      }
    }
  }
}
