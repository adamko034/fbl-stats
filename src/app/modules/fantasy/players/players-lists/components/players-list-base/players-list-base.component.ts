import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@UntilDestroy()
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

  public lastMatchday: number;
  public sorted: Player[] = [];

  constructor(private propertiesStore: PropertiesStore) {}

  public ngOnInit(): void {
    this.propertiesStore
      .selectLastMatchday()
      .pipe(untilDestroyed(this))
      .subscribe((lastMatchday) => {
        this.lastMatchday = lastMatchday;
        this.onSortChange({ active: lastMatchday > 0 ? 'totalPoints' : 'price', direction: 'desc' });
      });
  }

  public onSortChange(sort: Sort): void {
    if (!!sort.active) {
      const direction = sort.direction === 'asc' ? 'asc' : 'dsc';
      this.sorted = new ArrayStream<Player>(this.sorted).orderBy(sort.active, direction).collect();
    }
  }
}
