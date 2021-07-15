import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-team-navigation',
  templateUrl: './predicted-lineups-team-navigation.component.html',
  styleUrls: ['./predicted-lineups-team-navigation.component.scss']
})
export class PredictedLineupsTeamNavigationComponent implements OnInit {
  public teams$: Observable<Team[]>;
  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  public isScroll = true;

  @HostListener('window:scroll', ['$event'])
  private setIfShowSubrow(event) {
    this.isScroll = window.pageYOffset <= 10;
  }

  constructor(private route: ActivatedRoute, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    Logger.logDev('lineups teams list component, ng on init');
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
    this.screen$ = this.screenSizeService.onResize();
  }
}
