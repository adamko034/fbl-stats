import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { PredictedLineupsTeamAccuracy } from '../models/predicted-lineups-team-accuracy.model';
import { PredictedLineupsSourceTeamAccuracy } from '../store/models/predicted-lineups-source-team-accuracy.model';
import { PredictedLineupsSource } from '../store/models/predicted-lineups-source.model';
import { PredictedLineupsStore } from '../store/predicted-lineups.store';

@Injectable()
export class PredictedLineupsSourcesTeamsResolver implements Resolve<Observable<PredictedLineupsTeamAccuracy[]>> {
  constructor(private teamsStore: TeamsStore, private lineupsStore: PredictedLineupsStore) {}

  public resolve(): Observable<PredictedLineupsTeamAccuracy[]> {
    return combineLatest([this.teamsStore.selectAllWithoutGames(), this.lineupsStore.selectAllSources()]).pipe(
      first(),
      map(([teams, sources]) => this.getTeamsAccuracy(teams, sources))
    );
  }

  private getTeamsAccuracy(teams: Team[], sources: PredictedLineupsSource[]): PredictedLineupsTeamAccuracy[] {
    return teams.map((team) => this.getTeamAccuracy(team, sources));
  }

  private getTeamAccuracy(team: Team, sources: PredictedLineupsSource[]): PredictedLineupsTeamAccuracy {
    const sourcesTeam = this.getSourcesTeam(team, sources);

    const lastMd = this.getAvg(sourcesTeam, (t) => t.lastMdAccuracy);
    const last5 = this.getAvg(sourcesTeam, (t) => t.last5Accuracy);
    const season = this.getAvg(sourcesTeam, (t) => t.avgSeasonAccuracy);

    return {
      teamShort: team.shortName,
      lastMd,
      last5,
      season
    };
  }

  private getAvg(
    sourcesTeam: PredictedLineupsSourceTeamAccuracy[],
    func: (t: PredictedLineupsSourceTeamAccuracy) => number
  ) {
    const sourcesTeamWithoutNullValues = sourcesTeam.map(func).filter((value) => value != null);
    const count = sourcesTeamWithoutNullValues.length;

    if (count === 0) {
      return null;
    }

    const sum = sourcesTeamWithoutNullValues.reduce((a, b) => a + b);
    return Math.round((sum / count) * 100) / 100;
  }

  private getSourcesTeam(team: Team, sources: PredictedLineupsSource[]): PredictedLineupsSourceTeamAccuracy[] {
    return sources.map((s) => s.accuracy.teams.filter((t) => t.teamShort === team.shortName)[0]);
  }
}
