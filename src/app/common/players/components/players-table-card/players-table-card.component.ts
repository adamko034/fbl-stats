import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Position } from '../../models/position.enum';
import { PlayersTableCardConfig } from './models/players-table-card-config';
import { PlayersTableCardPlayer } from './models/players-table-card-player';

@Component({
  selector: 'app-players-table-card',
  templateUrl: './players-table-card.component.html',
  styleUrls: ['./players-table-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableCardComponent implements OnInit {
  @Input() config: PlayersTableCardConfig;
  @Input() players: PlayersTableCardPlayer[];
  @Input() otherFiltersTemplateRef: TemplateRef<any>;

  @Output() positionChange = new EventEmitter<Position>();
  @Output() showMoreClick = new EventEmitter();

  public position: Position = Position.ALL;

  constructor() {}

  ngOnInit(): void {}

  public onPositionChange(position: Position): void {
    this.position = position;
    this.positionChange.emit(position);
  }

  public onShowMoreClick(): void {
    this.showMoreClick.emit();
  }
}
