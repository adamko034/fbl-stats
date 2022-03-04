import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-standalone-game-icon',
  templateUrl: './standalone-game-icon.component.html',
  styleUrls: ['./standalone-game-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandaloneGameIconComponent implements OnInit {
  @Input() size = 15;

  constructor() {}

  ngOnInit(): void {}
}
