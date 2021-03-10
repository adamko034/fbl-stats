import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';

@Component({
  selector: 'app-our-picks-player-extended',
  templateUrl: './our-picks-player-extended.component.html',
  styleUrls: ['./our-picks-player-extended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksPlayerExtendedComponent implements OnInit {
  @Input() player: OurPicksPlayer;

  public Icons = OurPicksType;

  constructor(private playersDataService: PlayersDataService) {}

  ngOnInit(): void {}

  public getPointsColor(points: number) {
    return this.playersDataService.getPointsColor(points);
  }
}
