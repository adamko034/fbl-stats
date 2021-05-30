import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { FixtureDifficultyTableTeam } from '../models/fixture-difficulty-table-team.model';
import { FixtureDifficulty } from '../models/fixture-difficulty.model';
import { FixtureDifficultyColorsService } from '../services/fixture-difficulty-colors.service';
import { ScheduleTeamTableValueDeterimer } from './fixtures-difficulty-table-value-determiner';

export class FixturesDifficultyConverter implements Convertable<FixtureDifficulty, FixtureDifficultyTableTeam> {
  constructor(
    private scheduleColorService: FixtureDifficultyColorsService,
    private scheduleTableTeamValueDeterminer: ScheduleTeamTableValueDeterimer
  ) {}

  public convert(items: FixtureDifficulty[]): FixtureDifficultyTableTeam[] {
    return items.map((scheduleTeam: FixtureDifficulty) => ({
      shortName: scheduleTeam.shortName,
      longName: scheduleTeam.longName,
      value: this.scheduleTableTeamValueDeterminer.get(scheduleTeam),
      color: this.scheduleColorService.getColor(scheduleTeam.index)
    }));
  }
}
