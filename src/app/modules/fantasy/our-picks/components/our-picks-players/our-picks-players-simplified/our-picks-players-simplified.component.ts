import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-our-picks-players-simplified',
  templateUrl: './our-picks-players-simplified.component.html',
  styleUrls: ['./our-picks-players-simplified.component.scss']
})
export class OurPicksPlayersSimplifiedComponent {
  @Input() ourPicks: OurPicksPlayers;

  public get playersFound(): boolean {
    return !!this.ourPicks?.players && this.ourPicks.players.length > 0;
  }

  public isMobile$ = this.screenSizeService.isMobile$();
  public Types = OurPicksType;

  constructor(private screenSizeService: ScreenSizeService) {}
}
