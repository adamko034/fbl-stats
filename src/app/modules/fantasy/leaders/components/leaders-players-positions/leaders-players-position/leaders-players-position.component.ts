import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayersCombination } from 'src/app/store/leaders/models/leaders-players-combination.model';
import { LeadersStar } from 'src/app/store/leaders/models/leaders-star.model';
import {
  LeadersUsageTextValueConfig,
  LeadersUsageTextValueConverter
} from '../../../converters/leaders-usage-text-value.converter';
import { LeadersPlayersByPosition } from '../../../models/leaders-players-by-position.model';
import { LeadersTextValueDialgComponent } from '../../leaders-text-value-dialg/leaders-text-value-dialg.component';

@Component({
  selector: 'app-leaders-players-position',
  templateUrl: './leaders-players-position.component.html',
  styleUrls: ['./leaders-players-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersPlayersPositionComponent {
  @Input() title: string;
  @Input() data: LeadersPlayersByPosition;
  @Input() showStars = true;

  public isMobile$: Observable<boolean>;

  public get commonPlayers(): TextValue[] {
    if (!this.data?.players) {
      return [];
    }
    var config: LeadersUsageTextValueConfig = {
      boldMax: true,
      textField: 'lastName',
      valueType: 'both',
      showTeamLogo: true
    };

    return new ArrayStream<LeaderPlayer>([...this.data.players])
      .orderBy('usage', 'dsc')
      .take(5)
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();
  }

  public get topGrowthPlayers(): TextValue[] {
    if (!this.data?.players) {
      return [];
    }

    var config: LeadersUsageTextValueConfig = { valueType: 'difference', showTeamLogo: true, textField: 'lastName' };

    return new ArrayStream<LeaderPlayer>(this.data.players)
      .filterQuick((p) => p.usageDifference > 0)
      .orderBy('usageDifference', 'dsc')
      .take(3)
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();
  }

  public get topDropPlayers(): TextValue[] {
    if (!this.data?.players) {
      return [];
    }

    var config: LeadersUsageTextValueConfig = {
      valueType: 'difference',
      showTeamLogo: true,
      textField: 'lastName'
    };

    return new ArrayStream<LeaderPlayer>(this.data.players)
      .filterQuick((p) => p.usageDifference < 0)
      .orderBy('usageDifference', 'asc')
      .take(3)
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();
  }

  public get stars(): TextValue[] {
    if (!this.data?.stars) {
      return [];
    }

    var config: LeadersUsageTextValueConfig = {
      boldMax: true,
      valueType: 'usage',
      showTeamLogo: true,
      textField: 'lastName'
    };

    return new ArrayStream<LeadersStar>(this.data.stars)
      .orderBy('usage', 'dsc')
      .take(3)
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();
  }

  public get combinations(): TextValue[] {
    if (!this.data?.combinations) {
      return [];
    }

    var config: LeadersUsageTextValueConfig = {
      boldMax: true,
      valueType: 'usage',
      textField: 'combination',
      style: { padding: '3px 0' }
    };

    return new ArrayStream<LeadersPlayersCombination>(this.data.combinations)
      .orderBy('usage', 'dsc')
      .take(3)
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();
  }

  public get showMoreGrowth(): boolean {
    return (
      new ArrayStream<LeaderPlayer>(this.data.players).filterQuick((p) => p.usageDifference > 0).collect().length > 3
    );
  }

  public get showMoreDrop(): boolean {
    return (
      new ArrayStream<LeaderPlayer>(this.data.players).filterQuick((p) => p.usageDifference < 0).collect().length > 3
    );
  }

  constructor(private screenSizeService: ScreenSizeService, private matDialog: MatDialog) {
    this.isMobile$ = this.screenSizeService.isMobile$();
  }

  public onShowMoreClick(type: 'players' | 'combinations' | 'stars' | 'growth' | 'drop'): void {
    let dataValues = [];
    let config: LeadersUsageTextValueConfig;
    let title;
    let orderBy = { field: 'usage', sort: 'dsc' };

    if (type === 'players') {
      dataValues = this.data.players;
      config = { textField: 'lastName', valueType: 'both', showTeamLogo: true };
    }

    if (type === 'combinations') {
      dataValues = this.data.combinations;
      config = { textField: 'combination', valueType: 'usage' };
      title = 'All Combinations';
    }

    if (type === 'stars') {
      dataValues = this.data.stars;
      config = { textField: 'lastName', valueType: 'usage', showTeamLogo: true };
      title = 'All Stars';
    }

    if (type === 'growth') {
      dataValues = this.data.players;
      title = 'All Players';
      config = { textField: 'lastName', valueType: 'both', showTeamLogo: true };
      orderBy = { field: 'usageDifference', sort: 'dsc' };
    }

    if (type === 'drop') {
      dataValues = this.data.players;
      title = 'All Players';
      config = { textField: 'lastName', valueType: 'both', showTeamLogo: true };
      orderBy = { field: 'usageDifference', sort: 'asc' };
    }

    const values = new ArrayStream(dataValues)
      .orderBy(orderBy.field, orderBy.sort === 'dsc' ? 'dsc' : 'asc')
      .convert(new LeadersUsageTextValueConverter(config))
      .collect();

    this.matDialog.open(LeadersTextValueDialgComponent, { data: { values, title } });
  }
}
