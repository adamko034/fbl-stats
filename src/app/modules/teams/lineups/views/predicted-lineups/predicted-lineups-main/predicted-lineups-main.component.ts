import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-predicted-lineups-main',
  templateUrl: './predicted-lineups-main.component.html',
  styleUrls: ['./predicted-lineups-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
