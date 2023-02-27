import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-matchday-tips-our-picksy',
  templateUrl: './matchday-tips-our-picks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksComponent implements OnInit {
  public title$: Observable<string>;

  public screens = ScreenSize;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.title$ = this.route.data.pipe(map((data) => `Proposed picks for MD${data.lastMatchday + 1}`));
  }
}
