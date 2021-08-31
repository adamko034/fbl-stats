import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { TeamNavigation } from 'src/app/store/properties/properties.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-team-navigation',
  templateUrl: './predicted-lineups-team-navigation.component.html',
  styleUrls: ['./predicted-lineups-team-navigation.component.scss']
})
export class PredictedLineupsTeamNavigationComponent implements OnInit {
  @Input() teams: TeamNavigation[];

  public screen$: Observable<ScreenSize>;
  public screens = ScreenSize;

  public isScroll = true;

  @HostListener('window:scroll', ['$event'])
  private setIfShowSubrow(event) {
    this.isScroll = window.pageYOffset <= 10;
  }

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    Logger.logDev('lineups teams list component, ng on init');
    this.screen$ = this.screenSizeService.onResize();
  }
}
