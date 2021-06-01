import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PlayersListGenericConfig } from './models/players-list-generic-config.model';
import { PlayersListGenericData } from './models/players-list-generic-data.model';

@Component({
  selector: 'app-players-list-generic',
  templateUrl: './players-list-generic.component.html',
  styleUrls: ['./players-list-generic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersListGenericComponent implements OnInit {
  @Input() data: PlayersListGenericData;
  @Input() config: PlayersListGenericConfig;

  @Output() sortChange = new EventEmitter<Sort>();

  constructor() {}

  ngOnInit(): void {}

  public onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }
}
