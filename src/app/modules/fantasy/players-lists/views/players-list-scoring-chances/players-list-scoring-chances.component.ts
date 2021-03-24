import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { PlayersListGenericColumn } from '../../components/players-list-generic/models/players-list-generic-column.model';
import { PlayersListGenericConfig } from '../../components/players-list-generic/models/players-list-generic-config.model';
import { PlayersListGenericData } from '../../components/players-list-generic/models/players-list-generic-data.model';
import { PlayersListGenericRowsConverter } from '../../converters/players-list-generic-rows.converter';

interface State {
  orderBy: string;
  type: 'overall' | 'lasat5';
  data: PlayersListGenericData;
  config: PlayersListGenericConfig;
}

@UntilDestroy()
@Component({
  selector: 'app-players-list-scoring-chances',
  templateUrl: './players-list-scoring-chances.component.html',
  styleUrls: ['./players-list-scoring-chances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersListScoringChancesComponent implements OnInit {
  public state: State;

  public get typeFilterItems(): SwitchItem[] {
    return [
      { value: 'overall', description: 'Overall' },
      { value: 'last5', description: 'Last 5' }
    ];
  }

  public get orderByFilterItems(): SwitchItem[] {
    return [
      { value: '5', description: '5pts and more', descriptionMobile: '>= 5pts' },
      { value: '10', description: '10pts and more', descriptionMobile: '>= 10pts' },
      { value: '15', description: '15pts and more', descriptionMobile: '>= 15pts' },
      { value: '20', description: '20pts and more', descriptionMobile: '>= 20pts' }
    ];
  }

  constructor(private route: ActivatedRoute, private router: Router, private changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    combineLatest([this.route.data, this.route.params, this.route.queryParams])
      .pipe(
        map(([{ scoringChances }, { type }, { orderBy }]) => {
          let orderByParam = orderBy;

          if (
            !orderBy ||
            isNaN(orderBy) ||
            (orderBy !== '5' && orderBy !== '10' && orderBy !== '15' && orderBy !== '20')
          ) {
            orderByParam = '10';
          }

          const columns = this.getColumns(orderByParam);
          const rows = new ArrayStream(scoringChances)
            .convert(new PlayersListGenericRowsConverter(orderByParam))
            .collect();
          const listConfig = this.getListConfig(orderByParam);

          return {
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
    this.router.navigateByUrl(`/fantasy/lists/scoringChances/${value}?orderBy=${this.state.orderBy}`);
  }

  private getColumns(orderBy: string): PlayersListGenericColumn[] {
    return [
      {
        order: 1,
        fieldName: 'moreThan5PtsPercentage',
        displayName: '>= 5pts',
        hideOnMobile: orderBy !== '5'
      },
      {
        order: 2,
        fieldName: 'moreThan10PtsPercentage',
        displayName: '>= 10pts',
        hideOnMobile: orderBy !== '10'
      },
      {
        order: 3,
        fieldName: 'moreThan15PtsPercentage',
        displayName: '>= 15pts',
        hideOnMobile: orderBy !== '15'
      },
      {
        order: 4,
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
      sortByPlayerEnabled: false
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
