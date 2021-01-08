import { TeamScheduleGame } from 'src/app/modules/core/teams/schedules/models/team-schedule-game.model';

export interface TeamSchedule {
  shortName: string;
  longName: string;
  rank: number;
  games: { [key: string]: TeamScheduleGame };
  next2GamesIndex: number;
  next3GamesIndex: number;
  next5GamesIndex: number;
}
