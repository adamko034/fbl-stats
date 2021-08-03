import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bundesliga-table-filters',
  templateUrl: './bundesliga-table-filters.component.html',
  styleUrls: ['./bundesliga-table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
