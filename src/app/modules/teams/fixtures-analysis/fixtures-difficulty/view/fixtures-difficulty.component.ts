import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesDifficultyStateNew } from '../models/fixtures-difficulty-state.model';

@Component({
  selector: 'app-fixtures-difficulty',
  templateUrl: './fixtures-difficulty.component.html',
  styleUrls: ['./fixtures-difficulty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyComponent implements OnInit {
  public state$: Observable<FixturesDifficultyStateNew>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
