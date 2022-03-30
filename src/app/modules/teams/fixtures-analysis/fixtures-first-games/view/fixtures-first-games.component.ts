import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesFirstGamesState } from '../models/fixtures-first-games.state';

@Component({
  selector: 'app-fixtures-first-games',
  templateUrl: './fixtures-first-games.component.html',
  styleUrls: ['./fixtures-first-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesComponent implements OnInit {
  public state$: Observable<FixturesFirstGamesState>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
