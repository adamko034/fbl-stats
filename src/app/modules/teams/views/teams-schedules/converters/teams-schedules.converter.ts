import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ScheduleTableTeam } from 'src/app/modules/teams/views/teams-schedules/components/shared/schedules-table/models/schedule-table.model';
import { ScheduleTeamTableValueDeterimer } from 'src/app/modules/teams/views/teams-schedules/converters/schedule-team-table-value-determiner';
import { TeamSchedule } from 'src/app/modules/teams/views/teams-schedules/models/team-schedule.model';
import { TeamScheduleColorsService } from 'src/app/modules/teams/views/teams-schedules/services/team-schedule-colors.service';

export class TeamsSchedulesConverter implements Convertable<TeamSchedule, ScheduleTableTeam> {
  constructor(
    private scheduleColorService: TeamScheduleColorsService,
    private scheduleTableTeamValueDeterminer: ScheduleTeamTableValueDeterimer
  ) {}

  public convert(items: TeamSchedule[]): ScheduleTableTeam[] {
    return items.map((scheduleTeam: TeamSchedule) => ({
      shortName: scheduleTeam.shortName,
      longName: scheduleTeam.longName,
      value: this.scheduleTableTeamValueDeterminer.get(scheduleTeam),
      color: this.scheduleColorService.getColor(scheduleTeam.index)
    }));
  }
}
