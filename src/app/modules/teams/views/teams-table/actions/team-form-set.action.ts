import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { TableTeam } from 'src/app/modules/teams/views/teams-table/models/table-team.model';

export class TeamFormSetAction implements Actionable<TableTeam> {
  constructor(private count: number) {}

  public exec(items: TableTeam[]): TableTeam[] {
    this.count = this.count === 0 ? 5 : this.count;

    items.forEach((item) => {
      item.form = item.form.substring(0, this.count);
    });
    return items;
  }
}
