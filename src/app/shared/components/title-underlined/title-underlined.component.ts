import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-title-underlined',
  templateUrl: './title-underlined.component.html',
  styleUrls: ['./title-underlined.component.scss']
})
export class TitleUnderlinedComponent {
  @Input() padding = '0 50px';

  constructor() {}
}
