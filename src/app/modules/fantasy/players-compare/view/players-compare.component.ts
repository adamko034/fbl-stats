import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { PlayerPosition } from '../../players/overall/models/players-filters';
import { PlayerCompareCard } from '../models/player-compare-card.model';
import { PlayersCompareState } from '../models/players-compare-state.model';
import { PlayersCompareNavigationService } from '../services/players-compare-navigation.service';

interface GenereateOptions {
  position?: PlayerPosition;
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

  public generateOptions: GenereateOptions = {
    position: PlayerPosition.ALL,
    count: 6
  };
  public maxPrice: number = 0;

  public links: ViewTabNavigationLink[] = [
    { label: 'Compare players', labelMobile: 'Compare players', order: 1, routerLink: '' }
  ];

  constructor(private route: ActivatedRoute, private navigationService: PlayersCompareNavigationService) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.showPlayers$ = this.state$.pipe(map((state) => state.players.length > 0));
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

  public onPositionChange(newPosition: PlayerPosition): void {
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
      position: position === PlayerPosition.ALL ? null : position,
      maxPrice: maxPrice === this.maxPrice ? null : maxPrice
    };

    this.navigationService.goToTop(filters);
  }
}
