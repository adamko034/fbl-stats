import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-our-picks-matchday',
  templateUrl: './our-picks-matchday.component.html',
  styleUrls: ['./our-picks-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksMatchdayComponent {
  constructor() {}
}
