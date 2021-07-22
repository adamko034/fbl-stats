import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryPlayer } from '../../../../../../store/history/models/history-player.model';

@Component({
  selector: 'app-history-players',
  templateUrl: './history-players.component.html',
  styleUrls: ['./history-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPlayersComponent implements OnInit {
  public players$: Observable<HistoryPlayer[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
