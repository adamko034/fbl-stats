import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { HomeBundesligaTableTeam } from './home-bundesliga-table.team.model';

@Component({
  selector: 'app-home-bundesliga-table',
  templateUrl: './home-bundesliga-table.component.html',
  styleUrls: ['./home-bundesliga-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBundesligaTableComponent {
  @Input() set teams(value: Team[]) {
    this._rankings = new ArrayStream(value)
      .convertQuick((team) => ({
        teamShort: team.shortName,
        points: team.points,
        rank: team.rank,
        previousRank: team.previousRank,
        goalsConceded: team.goalsConceded,
        goalsScored: team.goalsScored,
        gamesPlayed: team.gamesPlayed
      }))
      .orderBy('rank', 'asc')
      .collect();
  }

  private _rankings: HomeBundesligaTableTeam[];
  public get rankings(): HomeBundesligaTableTeam[] {
    return this._rankings;
  }

  constructor(private router: Router) {}

  public onShowMoreClick() {
    this.router.navigate(['teams', 'bundesliga', 'table']);
  }
}
