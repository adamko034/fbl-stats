import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TeamNavigation } from 'src/app/store/properties/properties.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-team-navigation',
  templateUrl: './predicted-lineups-team-navigation.component.html',
  styleUrls: ['./predicted-lineups-team-navigation.component.scss']
})
export class PredictedLineupsTeamNavigationComponent {
  @Input() teams: TeamNavigation[];

  constructor() {}
}
