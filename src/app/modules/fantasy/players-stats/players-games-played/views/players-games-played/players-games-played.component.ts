import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { PlayersListGenericColumn } from 'src/app/shared/components/players-list-generic/models/players-list-generic-column.model';
import { PlayersListGenericConfig } from 'src/app/shared/components/players-list-generic/models/players-list-generic-config.model';
import { PlayersListGenericData } from 'src/app/shared/components/players-list-generic/models/players-list-generic-data.model';
import { PlayersListGenericRow } from 'src/app/shared/components/players-list-generic/models/players-list-generic-row.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { PlayedGamesToListGenericConverter } from '../../converters/played-games-to-list-generic.converter';
import { PlayerGamesPlayed } from '../../models/player-games-played.model';

@Component({
  selector: 'app-players-games-played',
  templateUrl: './players-games-played.component.html',
  styleUrls: ['./players-games-played.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersGamesPlayedComponent implements OnInit {
  private _orderBy = 'gamesStartedPercentage';
  private _position = Position.ALL;
  private _types: SwitchItem[] = [
    { value: 'gamesPlayedPercentage', description: 'Played' },
    { value: 'gamesStartedPercentage', description: 'Started' },
    // { value: 'playedMoreThan70MinPercentageAll', description: '>= 70min' },
    { value: 'playedMoreThan70MinPercentage', description: '70min' }
  ];
  private _selectedType = 'gamesStarted';

  public get position(): Position {
    return this._position;
  }

  public get types(): SwitchItem[] {
    return this._types;
  }

  public get selectedType(): string {
    return this._selectedType;
  }

  public get orderBy(): string {
    return this._orderBy;
  }

  public listData$: Observable<PlayersListGenericData>;
  public listConfig$: Observable<PlayersListGenericConfig>;
  public lastMatchday$: Observable<number>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.lastMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday));
    this.listData$ = combineLatest([this.route.data, this.route.queryParams]).pipe(
      tap(([_, params]) => (this._orderBy = params.orderBy || 'gamesStartedPercentage')),
      map(([data, _]) => data.players),
      map((players: PlayerGamesPlayed[]) => {
        return { columns: this.getListColumns(), rows: this.getListData(players) };
      })
    );

    this.listConfig$ = this.route.queryParams.pipe(
      map((params) => {
        this._orderBy = params.orderBy || 'gamesStartedPercentage';
        this._position = params.position || Position.ALL;
        return {
          defaultSortDirection: 'desc',
          defaultSortFieldName: this._orderBy,
          sortByPlayerEnabled: false,
          sortByTeamEnabled: false,
          hideNotActiveBreakPoint: 'md'
        };
      })
    );
  }

  public onSortChange(sort: Sort): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      relativeTo: this.route,
      queryParams: { orderBy: sort.active }
    });
  }

  public onPositionChange(newPosition: Position): void {
    this._position = newPosition;
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      relativeTo: this.route,
      queryParams: { position: newPosition }
    });
  }

  private getListData(players: PlayerGamesPlayed[]): PlayersListGenericRow[] {
    return new ArrayStream<PlayerGamesPlayed>(players)
      .convert<PlayersListGenericRow>(new PlayedGamesToListGenericConverter())
      .collect();
  }

  private getListColumns(): PlayersListGenericColumn[] {
    return [
      {
        order: 1,
        displayName: 'played',
        hideOnMobile: this._orderBy !== 'gamesPlayedPercentage',
        fieldName: 'gamesPlayedPercentage'
      },
      {
        order: 2,
        displayName: 'started',
        hideOnMobile: this._orderBy !== 'gamesStartedPercentage',
        fieldName: 'gamesStartedPercentage'
      },
      // {
      //   order: 3,
      //   displayName: '70min',
      //   hideOnMobile: this.orderBy !== 'playedMoreThan70MinPercentageAll',
      //   fieldName: 'playedMoreThan70MinPercentageAll'
      // },
      {
        order: 4,
        displayName: '70min',
        hideOnMobile: this._orderBy !== 'playedMoreThan70MinPercentage',
        fieldName: 'playedMoreThan70MinPercentage'
      }
    ];
  }
}
