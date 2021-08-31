import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamNavigation } from 'src/app/store/properties/properties.model';

@Component({
  selector: 'app-predicted-lineups-teams',
  templateUrl: './predicted-lineups-teams.component.html',
  styleUrls: ['./predicted-lineups-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsTeamsComponent {
  public teamsNavigation$: Observable<TeamNavigation[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.teamsNavigation$ = this.route.data.pipe(map((data) => data.teamsNavigation));
  }
}
