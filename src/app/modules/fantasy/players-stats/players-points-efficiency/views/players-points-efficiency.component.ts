import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SwitcherItem } from 'src/app/common/components/ui/switcher/models/switcher-item.model';
import { Position } from 'src/app/common/players/models/position.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayersListGenericColumn } from 'src/app/shared/components/players-list-generic/models/players-list-generic-column.model';
import { PlayersListGenericConfig } from 'src/app/shared/components/players-list-generic/models/players-list-generic-config.model';
import { PlayersListGenericData } from 'src/app/shared/components/players-list-generic/models/players-list-generic-data.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { PlayersListGenericRowsConverter } from '../converters/players-list-generic-rows.converter';

interface State {
  orderBy: string;
  type: 'overall' | 'last5';
  data: PlayersListGenericData;
  config: PlayersListGenericConfig;
  position: Position;
}

@UntilDestroy()
@Component({
  selector: 'app-players-points-efficiency',
  templateUrl: './players-points-efficiency.component.html',
  styleUrls: ['./players-points-efficiency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersPointsEfficiencyComponent implements OnInit {
  private _lastMatchday: number;
  public get lastMatchday(): number {
    return this._lastMatchday;
  }

  public state: State;
  public screens = ScreenSize;

  public typeFilterItems: SwitcherItem[] = [
    { value: 'overall', description: 'Overall' },
    { value: 'last5', description: 'Last 5' },
    { value: 'home', description: 'Home' },
    { value: 'away', description: 'Away' },
    { value: 'vsTop6', description: 'vs top 6' },
    { value: 'vsWorst6', description: 'vs worst 6' }
  ];

  public orderByFilterItems: SwitcherItem[] = [
    { value: '5', description: '>= 5pts', descriptionMobile: '>= 5pts' },
    { value: '10', description: '>= 10pts', descriptionMobile: '>= 10pts' },
    { value: '15', description: '>= 15pts', descriptionMobile: '>= 15pts' },
    { value: '20', description: '>= 20pts', descriptionMobile: '>= 20pts' }
  ];

  public mobile$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private screenSizeService: ScreenSizeService,
    private propertiesStore: PropertiesStore
  ) {}

  public ngOnInit(): void {
    this.mobile$ = this.screenSizeService.isMobile$();
    combineLatest([
      this.route.data,
      this.route.params,
      this.route.queryParams,
      this.propertiesStore.selectLastMatchday()
    ])
      .pipe(
        map(([{ pointsEfficiency }, { type }, { orderBy, position }, lastMatchday]) => {
          this._lastMatchday = lastMatchday;
          let orderByParam = orderBy;

          if (
            !orderBy ||
            isNaN(orderBy) ||
            (orderBy !== '5' && orderBy !== '10' && orderBy !== '15' && orderBy !== '20')
          ) {
            orderByParam = '10';
          }

          const columns = this.getColumns(orderByParam);
          const rows = new ArrayStream(pointsEfficiency).convert(new PlayersListGenericRowsConverter()).collect();
          const listConfig = this.getListConfig(orderByParam);

          return {
            position: position || Position.ALL,
            type,
            orderBy: orderByParam,
            config: listConfig,
            data: { columns, rows }
          };
        }),
        untilDestroyed(this)
      )
      .subscribe((state) => {
        this.state = state;
        this.changeDetection.detectChanges();
      });
  }

  public onSortChange(sort: Sort): void {
    this.state.orderBy = sort.active.match(/\d+/g)[0];
    this.nagivateToNewOrder();
  }

  public onOrderByChange(value: string): void {
    this.state.orderBy = value;
    this.nagivateToNewOrder();
  }

  public onTypeChange(value: string): void {
    this.changeType(value);
  }

  public onPositionChange(value: Position): void {
    this.router.navigate([], {
      queryParams: { position: value },
      queryParamsHandling: 'merge'
    });
  }

  public onTypeChangeDropdown(change: MatSelectChange) {
    this.changeType(change.value);
  }

  private changeType(newType: string) {
    this.router.navigate(['fantasy', 'stats', 'pointsefficiency', newType], { queryParamsHandling: 'preserve' });
  }

  private getColumns(orderBy: string): PlayersListGenericColumn[] {
    return [
      {
        order: 2,
        fieldName: 'moreThan5PtsPercentage',
        displayName: '>= 5pts',
        hideOnMobile: orderBy !== '5'
      },
      {
        order: 3,
        fieldName: 'moreThan10PtsPercentage',
        displayName: '>= 10pts',
        hideOnMobile: orderBy !== '10'
      },
      {
        order: 4,
        fieldName: 'moreThan15PtsPercentage',
        displayName: '>= 15pts',
        hideOnMobile: orderBy !== '15'
      },
      {
        order: 5,
        fieldName: 'moreThan20PtsPercentage',
        displayName: '>= 20pts',
        hideOnMobile: orderBy !== '20'
      }
    ];
  }

  private getListConfig(orderBy: string): PlayersListGenericConfig {
    return {
      defaultSortDirection: 'desc',
      defaultSortFieldName: `moreThan${orderBy}PtsPercentage`,
      sortByTeamEnabled: false,
      sortByPlayerEnabled: false,
      hideNotActiveBreakPoint: 'lg'
    };
  }

  private nagivateToNewOrder(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { orderBy: this.state.orderBy },
      queryParamsHandling: 'merge'
    });
  }
}
