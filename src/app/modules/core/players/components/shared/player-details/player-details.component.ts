import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayerDetailsLoadingService } from 'src/app/modules/core/players/components/shared/player-details/services/player-details-loading.service';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { Player } from 'src/app/store/players/models/player.model';
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
    private loadingService: PlayerDetailsLoadingService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('player details component, ' + this.player.name + ', on init');
    this.isLoading$ = this.loadingService.isLoading();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public onDetailsCollapse(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
