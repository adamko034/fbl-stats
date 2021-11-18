import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-has-played-seventy-minutes-icon',
  templateUrl: './has-played-seventy-minutes-icon.component.html',
  styleUrls: ['./has-played-seventy-minutes-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HasPlayedSeventyMinutesIconComponent {
  constructor() {}
}
