import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MyTeamPlayer } from '../../../../models/my-team-player.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-team-totals',
  templateUrl: './my-team-totals.component.html',
  styleUrls: ['./my-team-totals.component.scss']
})
export class MyTeamTotalsComponent implements OnInit {
  public players$: Observable<MyTeamPlayer[]>;

  constructor(private myTeamService: MyTeamStore) {}

  ngOnInit(): void {
    this.players$ = this.myTeamService.selectMyTeamPlayers();
  }
}
