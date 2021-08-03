import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bundesliga-table-inner',
  templateUrl: './bundesliga-table-inner.component.html',
  styleUrls: ['./bundesliga-table-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableInnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
