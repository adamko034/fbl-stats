import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-us-to-stay-tuned',
  templateUrl: './follow-us-to-stay-tuned.component.html',
  styleUrls: ['./follow-us-to-stay-tuned.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowUsToStayTunedComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}
}
