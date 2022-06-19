import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';

@Component({
  selector: 'app-history-players',
  templateUrl: './history-players.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPlayersComponent implements OnInit {
  public title$: Observable<string>;
  public players$: Observable<HistoryPlayer[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.title$ = this.route.data.pipe(map((data) => `Fantasy Players ${data.history.season}`));
    this.players$ = this.route.data.pipe(map((data) => data.history.players));
  }
}
