import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-summary',
  templateUrl: './history-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorySummaryComponent implements OnInit {
  public title$: Observable<string>;

  constructor(private _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.title$ = this._route.data.pipe(map((data) => `Team of the Season ${data.history.season}`));
  }
}
