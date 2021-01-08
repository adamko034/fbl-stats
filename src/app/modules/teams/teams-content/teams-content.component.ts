import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-teams-content',
  templateUrl: './teams-content.component.html',
  styleUrls: ['./teams-content.component.scss']
})
export class TeamsContentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    Logger.logDev('teams content component, ng on init');
  }

  public isActive(path: string) {
    return this.router.url.endsWith(path);
  }
}
