import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { BundesligaTableTeam } from '../models/bundesliga-table-team.model';

export class BundesligaTeamFormSetAction implements Actionable<BundesligaTableTeam> {
  constructor(private count: number) {}

  public exec(items: BundesligaTableTeam[]): BundesligaTableTeam[] {
    this.count = this.count === 0 ? 5 : this.count;

    items.forEach((item) => {
      item.form = item.form.substring(0, this.count);
    });
    return items;
  }
}
