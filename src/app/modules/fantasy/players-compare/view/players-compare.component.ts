import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));

    this.playersCards$ = this.state$.pipe(
      map((state) => state.players.map(({ name, teamShort, position, id }) => ({ name, teamShort, position, id })))
    );
  }
}
