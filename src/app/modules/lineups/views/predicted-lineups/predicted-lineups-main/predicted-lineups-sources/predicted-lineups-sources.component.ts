import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredictedLineupsSource } from 'src/app/modules/lineups/store/models/predicted-lineups-source.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-sources',
  templateUrl: './predicted-lineups-sources.component.html',
  styleUrls: ['./predicted-lineups-sources.component.scss']
})
export class PredictedLineupsSourcesComponent implements OnInit {
  public sources$: Observable<PredictedLineupsSource[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.sources$ = this.route.data.pipe(map((data) => data.sources));
  }
}
