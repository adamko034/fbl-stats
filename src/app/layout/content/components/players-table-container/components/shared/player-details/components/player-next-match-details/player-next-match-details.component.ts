import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/player-ui.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStoreService } from 'src/app/store/teams/teams-store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-next-match-details',
  templateUrl: './player-next-match-details.component.html',
  styleUrls: ['./player-next-match-details.component.scss']
})
export class PlayerNextMatchDetailsComponent implements OnInit, OnDestroy {
  @Input() player: PlayerUi;

  private destroyed$ = new Subject<void>();

  public homeTeam: Team;
  public awayTeam: Team;
  public current: 'home' | 'away';
  public show = false;

  public get homeTeamForm(): string[] {
    return this.homeTeam?.form.substring(0, 5).split('');
  }

  public get awayTeamForm(): string[] {
    return this.awayTeam.form.substring(0, 5).split('');
  }

  constructor(private teamsStoreService: TeamsStoreService, private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    combineLatest([
      this.teamsStoreService.select(this.player.teamShort),
      this.teamsStoreService.select(this.player.nextOpponent)
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([team, opponent]) => {
        if (!!team && !!opponent) {
          Logger.logDev('player next match details component, ' + this.player.name + ', got teams');
          this.homeTeam = this.player.nextGameIsHome ? team : opponent;
          this.awayTeam = this.player.nextGameIsHome ? opponent : team;
          this.current = this.player.nextGameIsHome ? 'home' : 'away';
          this.show = true;
          this.changeDetector.detectChanges();
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
