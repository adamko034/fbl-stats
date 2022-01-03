import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { TeamsKickOffTimesService } from 'src/app/modules/core/teams/services/teams-kickoff-times.service';
import { MatrixTableColor } from 'src/app/shared/components/matrix-table/models/matrix-table-color.enum';
import { MatrixTableColumn } from 'src/app/shared/components/matrix-table/models/matrix-table-column.model';
import { MatrixTableRow } from 'src/app/shared/components/matrix-table/models/matrix-table-row.model';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-kickoff-times',
  templateUrl: './players-compare-kickoff-times.component.html',
  styleUrls: ['./players-compare-kickoff-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareKickoffTimesComponent implements OnInit {
  private _min: number = 34;
  private _max: number = 0;

  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;
  @Input() matchdaysIncluded: number = 0;

  public matrix: MatrixTableRow[] = [];

  constructor(private teamsKickOffTimesService: TeamsKickOffTimesService, private teamService: TeamService) {}

  public ngOnInit(): void {
    for (let i: number = 0; i < this.players.length; i++) {
      this.matrix.push(this.playerToMatrixRow(this.players[i], i));
    }

    this.setMax();
    this.setColors();
  }

  private playerToMatrixRow(player: Player, order: number): MatrixTableRow {
    const { lastName, id } = player;
    const cols: MatrixTableColumn[] = [];

    for (let i: number = 0; i < this.players.length; i++) {
      const otherPlayer = this.players[i];

      if (otherPlayer.id === player.id) {
        cols.push({ id: otherPlayer.id, text: '--', color: MatrixTableColor.GREY });
        continue;
      }

      const team = this.teams[player.teamShort];
      const otherTeam = this.teams[otherPlayer.teamShort];

      const differentKickOffTimes = this.teamsKickOffTimesService.getDifferentKickoffTimes(
        team,
        otherTeam,
        this.lastMatchday + 1
      );
      cols.push({ id: otherPlayer.id, text: differentKickOffTimes.length.toString(), color: MatrixTableColor.GREY });

      if (differentKickOffTimes.length < this._min) {
        this._min = differentKickOffTimes.length;
      }
    }

    return { id, text: lastName, columns: cols, order };
  }

  private setMax(): void {
    this._max = this.matchdaysIncluded;

    if (this._max === 0) {
      const nextUnknownMatchday = this.teamService.getFirstMatchdayWithMissingDate(this.teams['fcb']);
      this._max = nextUnknownMatchday - (this.lastMatchday + 1);
    }
  }

  private setColors(): void {
    this.matrix.forEach((row) => {
      row.columns
        .filter((col) => col.text !== '' && !isNaN(+col.text))
        .forEach((col) => {
          const colorIndex = MathHelper.normalizeTo(+col.text, this._min, this._max, 5);
          //const colorIndex = MathHelper.normalizeTo(+col.text, 0, 2, 5);
          col.color = colorIndex;
        });
    });
  }
}
