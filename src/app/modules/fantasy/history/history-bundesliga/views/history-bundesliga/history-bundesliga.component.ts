import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryBundesligaTeam } from 'src/app/store/history/models/history-bundesliga-team.model';

@Component({
  selector: 'app-history-bundesliga',
  templateUrl: './history-bundesliga.component.html',
  styleUrls: ['./history-bundesliga.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryBundesligaComponent implements OnInit {
  public teams$: Observable<HistoryBundesligaTeam[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
  }
}
