import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerAttendancePrediction } from 'src/app/modules/core/players/models/player-attendance-prediction.enum';
import { TeamPredictedLineups } from 'src/app/modules/teams/lineups/store/models/team-predicted-lineups.model';
import { Player } from 'src/app/store/players/models/player.model';
import { TeamNavigation } from 'src/app/store/properties/properties.model';

@Component({
  selector: 'app-predicted-lineups-team',
  templateUrl: './predicted-lineups-team.component.html',
  styleUrls: ['./predicted-lineups-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsTeamComponent implements OnInit {
  public teamsNavigation$: Observable<TeamNavigation[]>;
  public teamPredictions$: Observable<TeamPredictedLineups>;
  public absences$: Observable<Player[]>;
  public players$: Observable<Player[]>;

  private showAllPlayersChange$ = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.teamsNavigation$ = this.route.data.pipe(map((data) => data.teamsNavigation));
    this.teamPredictions$ = this.route.data.pipe(map((data) => data.teamPredictions));
    this.absences$ = this.route.data.pipe(
      map((data) => {
        var players: Player[] = data.players;

        return players.filter((p) => p.attendance === 0);
      })
    );
    this.players$ = combineLatest([this.showAllPlayersChange$, this.route.data]).pipe(
      map(([showAll, data]) => {
        var players: Player[] = data.players;

        if (!showAll) {
          players = players.filter(
            (p) =>
              !p.nextGame.lineupPredictions
                .filter((l) => l.attendance !== PlayerAttendancePrediction.UnknownYet)
                .every((l) => l.attendance === PlayerAttendancePrediction.WillNotPlay)
          );
        }

        return players;
      })
    );
  }

  public getPrediction(player: Player, source: string): PlayerAttendancePrediction {
    var predictions = player.nextGame.lineupPredictions.filter((l) => l.source === source);

    if (!predictions || predictions.length === 0) {
      return PlayerAttendancePrediction.UnknownYet;
    }

    return predictions[0].attendance;
  }

  public onShowAllPlayersChange(matChange: MatCheckboxChange): void {
    this.showAllPlayersChange$.next(matChange.checked);
  }
}
