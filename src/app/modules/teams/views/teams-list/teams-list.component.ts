import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    Logger.logDev('teams list component, ng on init');
  }

  public ngOnDestroy() {
    console.log('list on destroy');
  }
}
