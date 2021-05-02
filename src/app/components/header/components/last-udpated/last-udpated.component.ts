import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-last-udpated',
  templateUrl: './last-udpated.component.html',
  styleUrls: ['./last-udpated.component.scss']
})
export class LastUdpatedComponent implements OnInit {
  public lastUpdated$: Observable<Date>;

  constructor(private propertiesService: PropertiesService) {}

  ngOnInit(): void {
    this.lastUpdated$ = this.propertiesService.selectLastUpdated().pipe(take(1));
  }
}
