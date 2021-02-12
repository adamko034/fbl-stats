import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayersCombinationUsage } from 'src/app/store/leaders/models/leaders-players-combination-usage.model';
import { LeadersUsageTextValueConverter } from '../../../converters/leaders-usage-text-value.converter';
import { LeadersPlayersByPosition } from '../../../models/leaders-players-by-position.model';

@Component({
  selector: 'app-leaders-players-position',
  templateUrl: './leaders-players-position.component.html',
  styleUrls: ['./leaders-players-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersPlayersPositionComponent {
  @Input() title: string;
  @Input() data: LeadersPlayersByPosition;

  @Output() showAllClick = new EventEmitter<'players' | 'combinations'>();

  public isMobile$: Observable<boolean>;

  public get commonPlayers(): TextValue[] {
    if (!this.data?.players) {
      return [];
    }

    return new ArrayStream<LeaderPlayer>(this.data.players)
      .convert(new LeadersUsageTextValueConverter('lastName', null, true))
      .collect();
  }

  public get combinations(): TextValue[] {
    if (!this.data?.combinations) {
      return [];
    }

    return new ArrayStream<LeadersPlayersCombinationUsage>(this.data.combinations)
      .convert(new LeadersUsageTextValueConverter('combination'))
      .collect();
  }

  constructor(private screenSizeService: ScreenSizeService) {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }

  public onShowMoreClick(type: 'players' | 'combinations'): void {
    this.showAllClick.emit(type);
  }
}
