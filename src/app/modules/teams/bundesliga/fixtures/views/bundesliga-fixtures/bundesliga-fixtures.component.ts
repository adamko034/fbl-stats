import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bundesliga-fixtures',
  templateUrl: './bundesliga-fixtures.component.html',
  styleUrls: ['./bundesliga-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
