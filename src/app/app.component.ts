import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private propertiesService: PropertiesService) {}

  public ngOnInit(): void {
    Logger.logDev('app component, on init');
    this.propertiesService.loadLastUpdated();
  }
}
