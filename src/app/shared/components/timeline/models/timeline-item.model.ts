import { TimelineTense } from 'src/app/shared/components/timeline/models/timeline-tense.enum';

export interface TimelineItem {
  order: number;
  tense: TimelineTense;
  title?: string;
  description?: string;
  descriptionCssClass?: string;
  descriptionDetails?: string;
  teamShort?: string;
}
