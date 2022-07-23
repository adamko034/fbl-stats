import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';

@UntilDestroy()
@Component({
  selector: 'app-matchday-tips-links',
  templateUrl: './matchday-tips-links.component.html',
  styleUrls: ['./matchday-tips-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsLinksComponent implements OnInit {
  public links$: Observable<MatchdayTipsLink[]>;
  public lastMatchday$: Observable<number>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.lastMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday));
    this.links$ = this.route.data.pipe(map((data) => data.tips.links));
  }

  public openInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
