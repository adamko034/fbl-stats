import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpandedPlayersService } from 'src/app/layout/content/components/players-table-container/services/expanded-players.service';
import { Player } from 'src/app/models/player.model';
import { TimelineDisplayOptions } from 'src/app/shared/components/timeline/models/timeline-display-options.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  @Input() player: Player;
  @Input() timelineOptions: TimelineDisplayOptions;

  public isExpanded$: Observable<boolean>;
  constructor(private expandedPlayersService: ExpandedPlayersService) {}

  ngOnInit(): void {
    this.isExpanded$ = this.expandedPlayersService.selectPlayerExpanded(this.player.id);
  }

  public onDetailsCollapse(): void {
    this.expandedPlayersService.toggleExpand(this.player.id);
  }
}
