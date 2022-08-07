import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-matchday-tips-our-picksy',
  templateUrl: './matchday-tips-our-picks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksComponent implements OnInit {
  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'Must have' },
    { icon: 'bargain', description: 'Budget pick' },
    { icon: 'differential', description: 'Differential' }
  ];

  public title$: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.title$ = this.route.data.pipe(map((data) => `Our proposed picks for MD${data.lastMatchday + 1}`));
  }
}
