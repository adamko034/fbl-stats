import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OurPicksPlayers } from '../../models/our-picks-players.model';

@Component({
  selector: 'app-our-picks-players',
  templateUrl: './our-picks-players.component.html',
  styleUrls: ['./our-picks-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayersComponent implements OnInit {
  @Input() ourPicks: OurPicksPlayers;

  constructor() {}

  ngOnInit(): void {}
}
