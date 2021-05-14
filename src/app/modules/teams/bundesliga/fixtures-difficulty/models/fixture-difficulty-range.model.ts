import { Range } from 'src/app/shared/models/range.model';

export interface FixtureDifficultyRange extends Range {
  color: string;
  indexValue: number;
}
