import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private propertiesService: PropertiesService) {}

  public ngOnInit(): void {
    this.propertiesService.loadLastUpdated();
  }
}
