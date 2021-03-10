import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadersMatchday } from 'src/app/store/leaders/models/leaders-matchday.model';

@Component({
  selector: 'app-leaders-matchday',
  templateUrl: './leaders-matchday.component.html',
  styleUrls: ['./leaders-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersMatchdayComponent implements OnInit {
  public matchday$: Observable<LeadersMatchday>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.matchday$ = this.route.data.pipe(map((data) => data.matchday));
  }
}
