import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent {
  constructor() {}
}
