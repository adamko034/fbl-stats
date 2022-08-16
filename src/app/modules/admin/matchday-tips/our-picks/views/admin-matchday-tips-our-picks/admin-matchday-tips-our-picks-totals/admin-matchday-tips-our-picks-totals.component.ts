import { Component, Input } from '@angular/core';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { AdminMatchdayTipsOurPicksMatchday } from '../../../models/admin-matchday-tips-our-picks.model';

@Component({
  selector: 'app-admin-matchday-tips-our-picks-totals',
  templateUrl: './admin-matchday-tips-our-picks-totals.component.html',
  styleUrls: ['./admin-matchday-tips-our-picks-totals.component.scss']
})
export class AdminMatchdayTipsOurPicksTotalsComponent {
  @Input() state: AdminMatchdayTipsOurPicksMatchday;

  public Types = MatchdayTipsOurPicksType;
}
