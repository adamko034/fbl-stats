import { Range } from 'src/app/shared/models/range.model';

export interface TeamScheduleRange extends Range {
  color: string;
  indexValue: number;
}
