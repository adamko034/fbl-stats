import { TeamScheduleRange } from 'src/app/modules/core/teams/schedules/models/team-schedule-range.model';

const scheduleIndexRanges: TeamScheduleRange[] = [
  { min: 1, max: 3, color: '#c72626', indexValue: 0 },
  { min: 4, max: 6, color: '#ff581a', indexValue: 2 },
  { min: 7, max: 9, color: 'orange', indexValue: 4 },
  { min: 10, max: 12, color: 'gold', indexValue: 6 },
  { min: 13, max: 15, color: 'lightgreen', indexValue: 8 },
  { min: 16, max: 18, color: '#28a428', indexValue: 10 }
];

export const TeamSchedulesStatic = { indexRanges: scheduleIndexRanges };
