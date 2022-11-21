import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';

@Component({
  selector: 'app-home-bundesliga-fixtures',
  templateUrl: './home-bundesliga-fixtures.component.html',
  styleUrls: ['./home-bundesliga-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBundesligaFixturesComponent {
  @Input() nextMatchday: number;
  @Input() nextFixtures: MatchdayFixtures;

  constructor(private router: Router) {}

  public onShowMoreClick() {
    this.router.navigate(['teams', 'bundesliga', 'fixtures']);
  }
}
