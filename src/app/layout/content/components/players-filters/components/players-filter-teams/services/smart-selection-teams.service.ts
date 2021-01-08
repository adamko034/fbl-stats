import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { SelectableSmartTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/selectable-smart-team.model';
import { SmartTeamsSelectionBy } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/smart-teams-selecetion-by.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SmartSelectionTeam } from 'src/app/store/teams-smart-selection/models/smart-selection-team.model';
import { SmartSelectionTeamsStore } from 'src/app/store/teams-smart-selection/smart-selection-teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class SmartSelectionTeamsService {
  constructor(private smartSelectionTeamsStore: SmartSelectionTeamsStore) {}

  public selectTeamsBy(by: SmartTeamsSelectionBy, count: number): Observable<SelectableSmartTeam[]> {
    return this.smartSelectionTeamsStore.select().pipe(
      filter((smartSelectionTeams) => !!smartSelectionTeams),
      tap((smartSelectionTeams) => Logger.logDev('smart selection teams service, got ' + smartSelectionTeams.length)),
      map((smartSelectionTeams: SmartSelectionTeam[]) => this.getBy(smartSelectionTeams, by, count)),
      map((smartSelectionTeams: SmartSelectionTeam[]) =>
        smartSelectionTeams.map((s, index) => ({
          shortName: s.team,
          smartChoiceInfo: s[by.toString()],
          order: index + 1
        }))
      )
    );
  }

  private getBy(
    smartSelectionTeams: SmartSelectionTeam[],
    by: SmartTeamsSelectionBy,
    count: number
  ): SmartSelectionTeam[] {
    const isAscending = this.shouldSortAscending(by);
    const order: 'asc' | 'dsc' = isAscending ? 'asc' : 'dsc';
    const ordered = new ArrayStream<SmartSelectionTeam>(smartSelectionTeams).orderBy(by.toString(), order).collect();
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
