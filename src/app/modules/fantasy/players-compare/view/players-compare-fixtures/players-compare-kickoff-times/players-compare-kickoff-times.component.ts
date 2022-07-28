import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MatrixTableColor } from 'src/app/common/components/ui/matrix-table/models/matrix-table-color.enum';
import { MatrixTableColumn } from 'src/app/common/components/ui/matrix-table/models/matrix-table-column.model';
import { MatrixTableConfig } from 'src/app/common/components/ui/matrix-table/models/matrix-table-config.model';
import { MatrixTableRow } from 'src/app/common/components/ui/matrix-table/models/matrix-table-row.model';
import { TeamsKickoffTimesService } from 'src/app/common/teams/teams-kickoff-times/services/teams-kickoff-times.service';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-kickoff-times',
  templateUrl: './players-compare-kickoff-times.component.html',
  styleUrls: ['./players-compare-kickoff-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareKickoffTimesComponent implements OnChanges {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;
  @Input() matchdaysCount: number = 0;

  private _max: number = 0;

  public get includeNextMatchdaysCount(): number {
    return this._max;
  }

  public matrix: MatrixTableRow[] = [];
  public matrixConfig: MatrixTableConfig = { mode: 'players', autoSetColor: false, showReflection: true };

  constructor(
    private teamsKickOffTimesService: TeamsKickoffTimesService,
    private teamService: TeamService,
    private changeDetection: ChangeDetectorRef
  ) {}

  public ngOnChanges(): void {
    this._max = 0;

    this.setData();
    this.setMax();
    this.setColors();

    this.changeDetection.detectChanges();
  }

  private setData(): void {
    this.matrix = [];
    for (let i: number = 0; i < this.players.length; i++) {
      this.matrix.push(this.playerToMatrixRow(this.players[i], i));
    }
  }

  private playerToMatrixRow(player: Player, order: number): MatrixTableRow {
    const { lastName, id } = player;
    const cols: MatrixTableColumn[] = [];

    for (let i: number = 0; i < this.players.length; i++) {
      const otherPlayer = this.players[i];

      if (otherPlayer.id === player.id) {
        cols.push({ id: otherPlayer.id, text: '--', color: MatrixTableColor.GREY, order });
        continue;
      }

      const team = this.teams[player.teamShort];
      const otherTeam = this.teams[otherPlayer.teamShort];

      const differentKickOffTimes = this.teamsKickOffTimesService.getDifferentKickoffTimes(
        team,
        otherTeam,
        this.lastMatchday + 1,
        this.matchdaysCount === 0 ? 0 : this.lastMatchday + this.matchdaysCount
      );
      cols.push({
        id: otherPlayer.id,
        text: differentKickOffTimes.length.toString(),
        color: MatrixTableColor.GREY,
        order
      });
    }

    return { id, text: lastName, columns: cols, order };
  }

  private setMax(): void {
    this._max = this.matchdaysCount;

    const team = this.teams[this.players[0].teamShort];
    if (team) {
      const nextUnknownMatchday = this.teamService.getFirstMatchdayWithMissingDate(team);

      if (this.matchdaysCount + this.lastMatchday >= nextUnknownMatchday) {
        this._max = nextUnknownMatchday - (this.lastMatchday + 1);
      }
    }
  }

  private setColors(): void {
    this.matrix.forEach((row) => {
      row.columns
        .filter((col) => col.text !== '' && !isNaN(+col.text))
        .forEach((col) => {
          const colorIndex = MathHelper.normalizeTo(+col.text, 0, this._max, 5);
          //const colorIndex = MathHelper.normalizeTo(+col.text, 0, 2, 5);
          col.color = colorIndex;
        });
    });
  }
}
