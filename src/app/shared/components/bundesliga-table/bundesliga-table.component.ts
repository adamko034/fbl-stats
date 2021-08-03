import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BundesligaTableConfig } from './models/bundesliga-table-config.model';
import { BundesligaTableTeam } from './models/bundesliga-table-team.model';

@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  styleUrls: ['./bundesliga-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableComponent implements OnInit {
  @Input() config: BundesligaTableConfig;
  @Input() data: BundesligaTableTeam[];

  constructor() {}

  ngOnInit(): void {}
}
