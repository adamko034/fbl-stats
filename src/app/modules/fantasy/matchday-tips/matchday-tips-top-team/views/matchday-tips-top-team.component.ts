import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { LineupPlayer } from 'src/app/shared/components/team-lineup/models/lineup-player.model';
import { Lineup } from 'src/app/shared/components/team-lineup/models/lineup.model';
import { TeamPlayersTableConfig } from 'src/app/shared/components/team-players-table/team-players-table-config.model';
import { TeamPlayersTablePlayer } from 'src/app/shared/components/team-players-table/team-players-table-player.model';
import { MatchdayTipsTopTeamPlayer } from '../models/matchday-tips-top-team-player.model';
import { MatchdayTipsTopTeamState } from '../models/matchday-tips-top-team-state.model';

@Component({
  selector: 'app-matchday-tips-top-team',
  templateUrl: './matchday-tips-top-team.component.html',
  styleUrls: ['./matchday-tips-top-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsTopTeamComponent implements OnInit {
  public state$: Observable<MatchdayTipsTopTeamState>;
  public lineup$: Observable<Lineup>;
  public playersTable$: Observable<TeamPlayersTablePlayer[]>;

  public get playersTableConfig(): TeamPlayersTableConfig {
    return {
      title: 'Best team',
      showTeamLogo: true,
      columns: [
        { header: 'Pos', objectFieldName: 'position' },
        { header: '$', objectFieldName: 'price', suffix: 'M' },
        { header: '%', objectFieldName: 'popularity', suffix: '%' },
        { header: 'top100 %', objectFieldName: 'top100Popularity', suffix: '%' },
        { header: 'top500 %', objectFieldName: 'top500Popularity', suffix: '%' },
        { header: 'GP', objectFieldName: 'gamesPlayed' },
        { header: 'Pts', objectFieldName: 'points' }
      ]
    };
  }

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.setLineup();
    this.setPlayersTable();
  }

  private setLineup(): void {
    this.lineup$ = this.state$.pipe(
      map((state) => state.team.firstLineup),
      map((players) => this.mapPlayersToTeamLineup(players))
    );
  }

  private setPlayersTable(): void {
    this.playersTable$ = this.state$.pipe(
      map((state) => state.team),
      map((team) => {
        return new ArrayStream<MatchdayTipsTopTeamPlayer>(team.firstLineup)
          .concat(team.bench)
          .convertQuick<TeamPlayersTablePlayer>((player) => {
            const {
              id,
              lastName,
              points,
              available,
              position,
              teamShort,
              popularity,
              top100Popularity,
              top500Popularity,
              price,
              gamesPlayed
            } = player;
            return {
              id,
              price,
              name: lastName,
              position: position.toUpperCase(),
              popularity,
              teamShort,
              available,
              other: {
                gamesPlayed: gamesPlayed.toString(),
                points: points.toString(),
                top100Popularity: top100Popularity.toString(),
                top500Popularity: top500Popularity.toString()
              }
            };
          })
          .collect();
      })
    );
  }

  private mapPlayersToTeamLineup(players: MatchdayTipsTopTeamPlayer[]): Lineup {
    const gk = players.filter((p) => p.position.toLocaleLowerCase() === 'gk');
    const defs = players.filter((p) => p.position.toLocaleLowerCase() === 'def');
    const mids = players.filter((p) => p.position.toLocaleLowerCase() === 'mid');
    const fors = players.filter((p) => p.position.toLocaleLowerCase() === 'for');

    return {
      goalkeeper: this.convertToLineupPlayers(gk)[0],
      defenders: this.convertToLineupPlayers(defs),
      midfielders: this.convertToLineupPlayers(mids),
      forwards: this.convertToLineupPlayers(fors)
    };
  }

  private convertToLineupPlayers(players: MatchdayTipsTopTeamPlayer[]): LineupPlayer[] {
    return players.map((player) => {
      const { name, lastName, id, position, subPosition, available } = player;

      return { name, lastName, position, id, team: player.teamShort, subPosition, available };
    });
  }
}
