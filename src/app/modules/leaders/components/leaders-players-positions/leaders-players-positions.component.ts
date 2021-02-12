import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { shortLongMaps } from 'src/app/resources/short-long.static';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayersCombinationUsage } from 'src/app/store/leaders/models/leaders-players-combination-usage.model';
import { LeadersPlayers } from 'src/app/store/leaders/models/leaders-players.model';
import { LeadersUsageTextValueConverter } from '../../converters/leaders-usage-text-value.converter';
import { LeadersPlayersByPosition } from '../../models/leaders-players-by-position.model';
import { LeadersTextValueDialgComponent } from '../dialogs/leaders-text-value-dialg/leaders-text-value-dialg.component';

@Component({
  selector: 'app-leaders-players-positions',
  templateUrl: './leaders-players-positions.component.html',
  styleUrls: ['./leaders-players-positions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersPlayersPositionsComponent {
  @Input() players: LeadersPlayers;

  constructor(private matDialog: MatDialog) {}

  public getLeadersPlayersByPosition(position: string): LeadersPlayersByPosition {
    return {
      combinations: this.players.combinations.top3[shortLongMaps.positions[position.toLowerCase()]],
      players: this.getPopularPlayersByPosition(position)
    };
  }

  public onShowAllClick(type: 'players' | 'combinations', position: string): void {
    const data: { values: TextValue[]; title: string } = { values: [], title: '' };

    if (type === 'players') {
      data.title = shortLongMaps.positions[position].toUpperCase();
      data.values = new ArrayStream<LeaderPlayer>(this.filterPlayersByPosition(position))
        .convert(new LeadersUsageTextValueConverter('name', null, true))
        .collect();
    }

    if (type === 'combinations') {
      data.title = `${shortLongMaps.positions[position].toUpperCase()} COMBINATIONS`;
      data.values = new ArrayStream<LeadersPlayersCombinationUsage>(
        this.players.combinations.all[shortLongMaps.positions[position].toLowerCase()]
      )
        .convert(new LeadersUsageTextValueConverter('combination'))
        .collect();
    }

    this.matDialog.open(LeadersTextValueDialgComponent, { data });
  }

  private getPopularPlayersByPosition(position: string): LeaderPlayer[] {
    return new ArrayStream<LeaderPlayer>(this.filterPlayersByPosition(position))
      .orderBy('usage', 'dsc')
      .take(5)
      .collect();
  }

  private filterPlayersByPosition(position: string): LeaderPlayer[] {
    return this.players.all.filter((p) => p.position.toLowerCase() === position.toLowerCase());
  }
}
