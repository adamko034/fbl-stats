import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-game-icon',
  templateUrl: './first-game-icon.component.html',
  styleUrls: ['./first-game-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstGameIconComponent implements OnInit {
  @Input() size = 15;
  constructor() {}

  ngOnInit(): void {}
}
