import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-players-games-played',
  templateUrl: './players-games-played.component.html',
  styleUrls: ['./players-games-played.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersGamesPlayedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
