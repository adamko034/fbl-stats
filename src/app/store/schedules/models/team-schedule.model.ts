import { Fixture } from 'src/app/store/schedules/models/fixture.model';

export interface TeamSchedule {
  teamShort: string;
  teamName: string;
  games: Fixture[];
}
