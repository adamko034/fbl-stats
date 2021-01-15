import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-players-list-base',
  templateUrl: './players-list-base.component.html',
  styleUrls: ['./players-list-base.component.scss']
})
export class PlayersListBaseComponent implements OnInit {
  @Input() set players(value: Player[]) {
    if (!!value && this.sorted.length === 0) {
      this.sorted = [...value];
    }
  }

  public sorted: Player[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.onSortChange({ active: 'team', direction: 'asc' });
  }

  public onSortChange(sort: Sort): void {
    if (!!sort.active) {
      const direction = sort.direction === 'asc' ? 'asc' : 'dsc';
      this.sorted = new ArrayStream<Player>(this.sorted).orderBy(sort.active, direction).collect();
    }
  }
}
