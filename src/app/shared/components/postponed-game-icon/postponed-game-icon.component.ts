import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-postponed-game-icon',
  templateUrl: './postponed-game-icon.component.html',
  styleUrls: ['./postponed-game-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostponedGameIconComponent implements OnInit {
  @Input() size = 15;

  constructor() {}

  ngOnInit(): void {}
}
