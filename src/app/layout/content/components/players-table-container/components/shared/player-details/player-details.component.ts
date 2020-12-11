import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayerDetailsLoadingService } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/services/player-details-loading.service';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { Player } from 'src/app/store/players/models/player.model';
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

  public isLoading$: Observable<boolean>;

  constructor(
    private expandedPlayersService: ExpandedPlayersService,
    private teamsStoreService: TeamsStoreService,
    private loadingService: PlayerDetailsLoadingService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('player details component, ' + this.player.name + ', on init');
    this.teamsStoreService.load(this.player.teamShort);
    this.teamsStoreService.load(this.player.nextGame.opponent);
    this.isLoading$ = this.loadingService.isLoading();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public onDetailsCollapse(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
