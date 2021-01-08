import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  constructor() {}

  public ngOnInit() {
    Logger.logDev('content component, on init');
  }
}
