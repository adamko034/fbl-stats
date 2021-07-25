import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { Team } from 'src/app/store/teams/models/team.model';

export class BundesligaTeamFormSetAction implements Actionable<Team> {
  constructor(private count: number) {}

  public exec(items: Team[]): Team[] {
    this.count = this.count === 0 ? 5 : this.count;

    items.forEach((item) => {
      item.form = item.form.substring(0, this.count);
    });
    return items;
  }
}
