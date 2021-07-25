import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-history-summary',
  templateUrl: './history-summary.component.html',
  styleUrls: ['./history-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorySummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
