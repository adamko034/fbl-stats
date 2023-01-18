import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { constants } from 'src/app/resources/resources';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-players-list-suspension-risk',
  templateUrl: './players-list-suspension-risk.component.html',
  styleUrls: ['./players-list-suspension-risk.component.scss']
})
export class PlayersListSuspensionRiskComponent implements OnInit {
  public players$: Observable<Player[]>;

  public get source(): string {
    return constants.links.transfermarkt.suspensionRisk;
  }

  public screens = ScreenSize;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
