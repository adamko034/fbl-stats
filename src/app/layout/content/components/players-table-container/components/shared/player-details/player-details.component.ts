import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStoreService } from 'src/app/store/teams/teams-store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  @Input() player: Player;

  private destroyed$ = new Subject<void>();

  public playerTeam: Team;
  public homeTeam: Team;
  public awayTeam: Team;
  public lastMatchday: number;
  public showLoading = true;

  constructor(private expandedPlayersService: ExpandedPlayersService, private teamsStoreService: TeamsStoreService) {}

  public ngOnInit(): void {
    Logger.logDev('player details component, ' + this.player.name + ', on init');
    this.teamsStoreService.load(this.player.teamShort);
    this.teamsStoreService.load(this.player.nextOpponent);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public onDetailsCollapse(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
