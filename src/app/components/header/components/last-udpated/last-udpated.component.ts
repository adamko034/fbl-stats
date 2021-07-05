import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-last-udpated',
  templateUrl: './last-udpated.component.html',
  styleUrls: ['./last-udpated.component.scss']
})
export class LastUdpatedComponent implements OnInit {
  public lastUpdated$: Observable<Date>;

  constructor(private propertiesService: PropertiesStore) {}

  ngOnInit(): void {
    this.lastUpdated$ = this.propertiesService.selectLastUpdated().pipe(take(1));
  }
}
