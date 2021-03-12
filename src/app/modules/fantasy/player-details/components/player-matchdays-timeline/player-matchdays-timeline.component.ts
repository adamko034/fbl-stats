import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-player-matchdays-timeline',
  templateUrl: './player-matchdays-timeline.component.html',
  styleUrls: ['./player-matchdays-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerMatchdaysTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
