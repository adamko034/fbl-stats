import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-home-bundesliga',
  templateUrl: './home-bundesliga.component.html',
  styleUrls: ['./home-bundesliga.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBundesligaComponent implements OnInit {
  @Input() lastMatchday: number;
  @Input() nextMatchdayFixtures: MatchdayFixtures;
  @Input() teams: Team[];

  constructor() {}

  ngOnInit(): void {}
}
