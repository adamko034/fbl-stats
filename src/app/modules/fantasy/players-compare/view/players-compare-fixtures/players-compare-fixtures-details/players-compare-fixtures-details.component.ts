import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoldableValuesData } from 'src/app/modules/core/boldable-values/boldable-values-data';
import { BoldableValuesService } from 'src/app/modules/core/boldable-values/boldable-values.service';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareFixturesBoldableCalculator } from '../../../logic/players-compare-fixtures-boldable';
import { PlayersCompareFixturesKey } from './players-compare-fixtures-key.enum';

@Component({
  selector: 'app-players-compare-fixtures-details',
  templateUrl: './players-compare-fixtures-details.component.html',
  styleUrls: ['./players-compare-fixtures-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareFixturesDetailsComponent implements OnChanges {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;
  @Input() matchdaysCount: number = 0;

  private _values: { [key: string]: { players: { id: string; value: number }[]; boldValue: number } } = {};
  private _boldMinKeys = [PlayersCompareFixturesKey.AWAY, PlayersCompareFixturesKey.VS_TOP];

  public keys = PlayersCompareFixturesKey;

  public get nextMatchdaysCount(): number {
    return this.matchdaysCount === 0 ? 34 - this.lastMatchday : this.matchdaysCount;
  }

  constructor(private teamService: TeamService, private boldValuesService: BoldableValuesService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.needToRecalculate(changes)) {
      this.calculateValues();
    }
  }

  public getBoldableString(key: PlayersCompareFixturesKey, id: string): string {
    return this.boldValuesService.getBoldableValue(key, id);
  }

  private needToRecalculate(changes: SimpleChanges): boolean {
    return (
      (changes.matchdaysCount && changes.matchdaysCount.currentValue != changes.matchdaysCount.previousValue) ||
      (changes.players && changes.players.currentValue.length != changes.players.previousValue.lenght)
    );
  }

  private calculateValues(): void {
    Logger.logDev('players compare fixtures details, calculating values');
    var calculator = new PlayersCompareFixturesBoldableCalculator(
      this.teamService,
      this.teams,
      this.lastMatchday + 1,
      this.matchdaysCount
    );
    var data: BoldableValuesData<Player> = {
      items: this.players,
      minBoldForKeys: [PlayersCompareFixturesKey.AWAY, PlayersCompareFixturesKey.VS_TOP],
      keys: Object.values(PlayersCompareFixturesKey)
    };

    this.boldValuesService.calculateValues(data, calculator);
  }
}
