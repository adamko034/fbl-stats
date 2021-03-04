import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { MatchdayFixtureDisplay } from './models/matchday-fixture-display.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.scss']
})
export class MatchdayComponent {
  @Input() matchday: Matchday;
  @Input() display: MatchdayFixtureDisplay = MatchdayFixtureDisplay.LONG;
  @Input() clickable = false;

  @Output() teamClick = new EventEmitter<string>();

  constructor() {}

  public onTeamClick(teamShort: string): void {
    this.teamClick.emit(teamShort);
  }
}
