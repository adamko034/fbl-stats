import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerDetailsLoadingService } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/services/player-details-loading.service';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStoreService } from 'src/app/store/teams/teams-store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-player-next-match-teams',
  templateUrl: './player-next-match-teams.component.html',
  styleUrls: ['./player-next-match-teams.component.scss']
})
export class PlayerNextMatchTeamsComponent implements OnInit, OnDestroy {
  @Input() player: PlayerUi;

  private destroyed$ = new Subject<void>();

  public homeTeam: Team;
  public awayTeam: Team;
  public current: 'home' | 'away';

  public get homeTeamForm(): string[] {
    return this.homeTeam?.form.substring(0, 5).split('');
  }

  public get awayTeamForm(): string[] {
    return this.awayTeam.form.substring(0, 5).split('');
  }

  constructor(
    private teamsStoreService: TeamsStoreService,
    private changeDetector: ChangeDetectorRef,
    private loadingService: PlayerDetailsLoadingService
  ) {}

  public ngOnInit(): void {
    this.loadingService.startLoading('next-match-teams');
    combineLatest([
      this.teamsStoreService.select(this.player.teamShort),
      this.teamsStoreService.select(this.player.nextGame.opponent)
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([team, opponent]) => {
        if (!!team && !!opponent) {
          Logger.logDev('player next match details component, ' + this.player.name + ', got teams');
          this.homeTeam = this.player.nextGame.isHome ? team : opponent;
          this.awayTeam = this.player.nextGame.isHome ? opponent : team;
          this.current = this.player.nextGame.isHome ? 'home' : 'away';
          this.changeDetector.detectChanges();
          this.loadingService.endLoading('next-match-teams');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public getGoalsScoredPerGame(team: Team): number {
    return Math.round((team.goalsScored / team.gamesPlayed + Number.EPSILON) * 100) / 100;
  }

  public getGoalsConcededPerGame(team: Team): number {
    return Math.round((team.goalsConceded / team.gamesPlayed + Number.EPSILON) * 100) / 100;
  }

  public getRank(team: Team): string {
    let suffix = 'th';

    if (team.rank === 1) {
      suffix = 'st';
    } else if (team.rank === 2) {
      suffix = 'nd';
    } else if (team.rank === 3) {
      suffix = 'rd';
    }

    return `${team.rank}${suffix}`;
  }
}
