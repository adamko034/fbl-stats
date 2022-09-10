import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-time-ago',
  templateUrl: './time-ago.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeAgoComponent {
  @Input() date: Date | number;
  @Input() isEpochDate = false;
  @Input() style: string;

  public get epochDate(): number {
    return this.date as number;
  }
}
