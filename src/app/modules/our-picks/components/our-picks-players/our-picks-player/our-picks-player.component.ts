import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OurPicksPlayer } from '../../../models/our-picks-player.model';

@Component({
  selector: 'app-our-picks-player',
  templateUrl: './our-picks-player.component.html',
  styleUrls: ['./our-picks-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayerComponent implements OnInit {
  @Input() player: OurPicksPlayer;

  constructor() {}

  ngOnInit(): void {}
}
