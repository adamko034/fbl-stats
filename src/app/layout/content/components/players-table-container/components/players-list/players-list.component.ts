import { Component, Input } from '@angular/core';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: PlayerUi[] = [];

  public playerTimelineOptions: TimelineDisplayOptions = { pastItemsCount: 1, futureItemsCount: 2 };
  public playerTimelineOptionsMobile: TimelineDisplayOptions = { pastItemsCount: 0, futureItemsCount: 2 };

  constructor() {}
}
