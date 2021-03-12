import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerDetails } from '../../models/player-details.model';

@Component({
  selector: 'app-player-details-content',
  templateUrl: './player-details-content.component.html',
  styleUrls: ['./player-details-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsContentComponent implements OnInit {
  public player$: Observable<PlayerDetails>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.player$ = this.route.data.pipe(map((data) => data.player));
  }
}
