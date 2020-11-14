import { Component, Input, OnInit } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';

@Component({
  selector: 'app-players-tiles',
  templateUrl: './players-tiles.component.html',
  styleUrls: ['./players-tiles.component.scss']
})
export class PlayersTilesComponent implements OnInit {
  @Input() players: PlayerUi[] = [];

  public timelineOptions: TimelineDisplayOptions = { pastItemsCount: 1, futureItemsCount: 2 };
  public timelineOptionsSmall: TimelineDisplayOptions = { pastItemsCount: 0, futureItemsCount: 1 };

  constructor() {}

  ngOnInit(): void {}
}
