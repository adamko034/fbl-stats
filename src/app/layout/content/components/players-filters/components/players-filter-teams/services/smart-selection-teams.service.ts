import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectableSmartTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/selectable-smart-team.model';
import { SmartTeamsSelectionBy } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/smart-teams-selecetion-by.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';

@Injectable({ providedIn: 'root' })
export class SmartSelectionTeamsService {
  constructor(private teamsStore: TeamsStore) {}

  public selectTeamsBy(by: SmartTeamsSelectionBy, count: number): Observable<SelectableSmartTeam[]> {
    return this.teamsStore.selectAllWithoutGames().pipe(
      map((teams: Team[]) => this.getBy(teams, by, count)),
      map((teams: Team[]) =>
        teams.map((s, index) => ({
          shortName: s.shortName,
          smartChoiceInfo: s[by.toString()],
          order: index + 1
        }))
      )
    );
  }

  private getBy(teams: Team[], by: SmartTeamsSelectionBy, count: number): Team[] {
    const isAscending = this.shouldSortAscending(by);
    const order: 'asc' | 'dsc' = isAscending ? 'asc' : 'dsc';
    const ordered = new ArrayStream<Team>(teams).orderBy(by.toString(), order).collect();
    const max = ordered[count - 1][by.toString()];

    return ordered.filter((team) => (isAscending ? team[by.toString()] <= max : team[by.toString()] >= max));
  }

  private shouldSortAscending(by: SmartTeamsSelectionBy): boolean {
    return (
      [SmartTeamsSelectionBy.Gcpg, SmartTeamsSelectionBy.GoalsConceded, SmartTeamsSelectionBy.Rank].findIndex(
        (asc) => asc === by
      ) >= 0
    );
  }
}
