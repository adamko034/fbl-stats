import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksPlayers } from 'src/app/modules/core/our-picks/models/our-picks-players.model';

@Component({
  selector: 'app-our-picks-admin',
  templateUrl: './our-picks-admin.component.html',
  styleUrls: ['./our-picks-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksAdminComponent implements OnInit {
  public ourPicks$: Observable<OurPicksPlayers>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ourPicks$ = this.route.data.pipe(map((data) => data.players));
  }
}
