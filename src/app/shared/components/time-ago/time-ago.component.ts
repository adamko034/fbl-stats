import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-ago',
  templateUrl: './time-ago.component.html',
  styleUrls: ['./time-ago.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeAgoComponent implements OnInit {
  @Input() date: Date | number;
  @Input() isEpochDate = false;
  @Input() style: string;

  public get epochDate(): number {
    return this.date as number;
  }

  constructor() {}

  ngOnInit(): void {}
}
