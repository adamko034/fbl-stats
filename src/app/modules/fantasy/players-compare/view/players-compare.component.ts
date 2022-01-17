import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { PlayerCompareCard } from '../models/player-compare-card.model';
import { PlayersCompareState } from '../models/players-compare-state.model';

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

  public links: ViewTabNavigationLink[] = [
    { label: 'Compare players', labelMobile: 'Compare players', order: 1, routerLink: '' }
  ];

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.showPlayers$ = this.state$.pipe(map((state) => state.players.length > 0));
    this.playersCards$ = this.state$.pipe(
      map((state) =>
        state.players.map(({ name, teamShort, position, id, price }) => ({ name, teamShort, position, price, id }))
      )
    );
  }
}
