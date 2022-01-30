import { Component, Input } from '@angular/core';
import { MyTeamPlayersFitlersService } from '../../../../services/my-team-players-filters.service';

@Component({
  selector: 'app-my-team-filters-matchdays',
  templateUrl: './my-team-filters-matchdays.component.html',
  styleUrls: ['./my-team-filters-matchdays.component.scss']
})
export class MyTeamFiltersMatchdaysComponent {
  @Input() lastMatchday: number;
  @Input() matchdays: number;

  constructor(private myTeamPlayersFiltersService: MyTeamPlayersFitlersService) {}

  public onMatchdaysChanged(matchdays: number) {
    this.myTeamPlayersFiltersService.updateMatchdays(matchdays);
  }
}
