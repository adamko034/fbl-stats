import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-name-with-availability',
  templateUrl: './player-name-with-availability.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerNameWithAvailabilityComponent implements OnInit {
  @Input() name: string;
  @Input() lastName: string;
  @Input() id: string;
  @Input() available: boolean;
  @Input() suspensionRisk: boolean;
  @Input() returning: boolean;
  constructor() {}

  ngOnInit(): void {}
}
