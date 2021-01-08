import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Logger.logDev('teams list component, ng on init');
  }
}
