import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamPlayersFitlersService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-players-filters.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-my-team-filters-matchdays',
  templateUrl: './my-team-filters-matchdays.component.html',
  styleUrls: ['./my-team-filters-matchdays.component.scss']
})
export class MyTeamFiltersMatchdaysComponent implements OnInit {
  public lastMatchday$: Observable<number>;
  public matchdays$: Observable<number>;

  constructor(
    private propertiesService: PropertiesService,
    private myTeamPlayersFiltersService: MyTeamPlayersFitlersService
  ) {}

  public ngOnInit(): void {
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
    this.matchdays$ = this.myTeamPlayersFiltersService.selectMatchdays();
  }

  public onMatchdaysChanged(matchdays: number) {
    this.myTeamPlayersFiltersService.updateMatchdays(matchdays);
  }
}
