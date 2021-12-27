import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerCompareCard } from '../../models/player-compare-card.model';

@Component({
  selector: 'app-players-compare-title',
  templateUrl: './players-compare-title.component.html',
  styleUrls: ['./players-compare-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareTitleComponent implements OnInit {
  @Input() players: PlayerCompareCard[];

  constructor() {}

  ngOnInit(): void {}
}
