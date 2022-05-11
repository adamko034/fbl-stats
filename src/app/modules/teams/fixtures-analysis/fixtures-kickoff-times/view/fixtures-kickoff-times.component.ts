import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesKickoffTimesState } from '../models/fixtures-kickoff-times-state.model';

@Component({
  selector: 'app-fixtures-kickoff-times',
  templateUrl: './fixtures-kickoff-times.component.html',
  styleUrls: ['./fixtures-kickoff-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesKickoffTimesComponent implements OnInit {
  public state$: Observable<FixturesKickoffTimesState>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
