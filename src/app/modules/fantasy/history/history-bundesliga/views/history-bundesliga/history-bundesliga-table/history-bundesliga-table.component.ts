import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-history-bundesliga-table',
  templateUrl: './history-bundesliga-table.component.html',
  styleUrls: ['./history-bundesliga-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryBundesligaTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
