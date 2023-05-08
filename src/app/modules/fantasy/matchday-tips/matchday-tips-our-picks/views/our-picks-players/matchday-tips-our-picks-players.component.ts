import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksPlayers } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-players.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';

@Component({
  selector: 'app-matchday-tips-our-picks-players',
  templateUrl: './matchday-tips-our-picks-players.component.html',
  styleUrls: ['./matchday-tips-our-picks-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksPlayersComponent implements OnInit {
  public ourPicks$: Observable<MatchdayTipsOurPicksPlayers>;

  public Types = MatchdayTipsOurPicksType;
  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'Must have' },
    { icon: 'bargain', description: 'Budget pick' },
    { icon: 'differential', description: 'Differential' }
  ];

  public defenders$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public goalkeepers$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public mids$: Observable<MatchdayTipsOurPicksPlayer[]>;
  public forwards$: Observable<MatchdayTipsOurPicksPlayer[]>;

  public matchday$: Observable<number>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.matchday$ = this.route.data.pipe(map((state) => state.lastMatchday + 1));
    this.ourPicks$ = this.route.data.pipe(
      map((data) => {
        let playersToDisplay = [...data.ourPicks?.players] || [];

        playersToDisplay = new ArrayStream<MatchdayTipsOurPicksPlayer>(playersToDisplay)
          .orderBy('order', 'asc')
          .collect();

        return { ...data.ourPicks, players: playersToDisplay };
      })
    );

    this.defenders$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'def'))
    );
    this.mids$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'mid'))
    );
    this.goalkeepers$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'gk'))
    );
    this.forwards$ = this.ourPicks$.pipe(
      map((ourPicks) => ourPicks.players.filter((p) => p.position.toLowerCase() === 'for'))
    );
  }
}
