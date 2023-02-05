import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { PlayerCompareCard } from '../models/player-compare-card.model';
import { PlayersCompareFixturesFilters } from '../models/players-compare-fixtures-filters.model';
import { PlayersCompareState } from '../models/players-compare-state.model';
import { PlayersCompareFiltersService } from '../services/players-compare-filters.service';
import { PlayersCompareNavigationService } from '../services/players-compare-navigation.service';

interface GenereateOptions {
  position?: Position;
  count?: number;
  maxPrice?: number;
}

@UntilDestroy()
@Component({
  selector: 'app-players-compare',
  templateUrl: './players-compare.component.html',
  styleUrls: ['./players-compare.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareComponent implements OnInit {
  public playersCards$: Observable<PlayerCompareCard[]>;
  public state$: Observable<PlayersCompareState>;
  public showPlayers$: Observable<boolean>;
  public filters$: Observable<PlayersCompareFixturesFilters>;

  public generateOptions: GenereateOptions = {
    position: Position.ALL,
    count: 6
  };
  public maxPrice: number = 0;
  public bestGksLink: string;
  public screens = ScreenSize;

  constructor(
    private route: ActivatedRoute,
    private navigationService: PlayersCompareNavigationService,
    private fitlersService: PlayersCompareFiltersService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.bestGksLink = this.router.createUrlTree(['fantasy', 'compare', 'bestgks']).toString();
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.showPlayers$ = this.state$.pipe(map((state) => state.players.length > 0));
    this.filters$ = this.fitlersService.selectFilters();
    this.playersCards$ = this.state$.pipe(
      map((state) =>
        state.players.map(({ name, teamShort, position, id, price }) => ({ name, teamShort, position, price, id }))
      )
    );

    this.route.data
      .pipe(
        map((data) => data.state.maxPrice),
        untilDestroyed(this)
      )
      .subscribe((maxPrice) => {
        this.maxPrice = maxPrice;

        if (!this.generateOptions.maxPrice) {
          this.generateOptions.maxPrice = maxPrice;
        }
      });
  }

  public onPlayerSelected({ id }: PlayerPicker): void {
    this.navigationService.addPlayer(id.toString());
  }

  public onPositionChange(newPosition: Position): void {
    this.generateOptions.position = newPosition;
  }

  public onCountChange(newCount: number): void {
    this.generateOptions.count = newCount;
  }

  public onMaxPriceChange(maxPrice: number): void {
    this.generateOptions.maxPrice = maxPrice;
  }

  public generateComparison(): void {
    const { count, position, maxPrice } = this.generateOptions;
    const filters = {
      count: count === 6 ? null : count,
      position: position === Position.ALL ? null : position,
      maxPrice: maxPrice === this.maxPrice ? null : maxPrice
    };

    this.navigationService.goToTop(filters);
  }
}
