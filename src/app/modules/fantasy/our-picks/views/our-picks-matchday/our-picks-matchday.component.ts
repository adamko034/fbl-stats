import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';

@Component({
  selector: 'app-our-picks-matchday',
  templateUrl: './our-picks-matchday.component.html',
  styleUrls: ['./our-picks-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksMatchdayComponent implements OnInit {
  public ourPicks$: Observable<OurPicksPlayers>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ourPicks$ = this.route.data.pipe(map((data) => data.ourPicks));
  }
}
