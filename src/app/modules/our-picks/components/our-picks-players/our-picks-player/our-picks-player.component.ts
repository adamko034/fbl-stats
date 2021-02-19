import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayersDataService } from 'src/app/modules/players/views/players-fantasy/components/players-table-container/services/players-data.service';
import { OurPicksPlayer } from '../../../models/our-picks-player.model';

@Component({
  selector: 'app-our-picks-player',
  templateUrl: './our-picks-player.component.html',
  styleUrls: ['./our-picks-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayerComponent implements OnInit {
  @Input() player: OurPicksPlayer;

  constructor(private playersDataService: PlayersDataService) {}

  ngOnInit(): void {}

  public getPointsColor(points: number) {
    return this.playersDataService.getPointsColor(points);
  }
}
