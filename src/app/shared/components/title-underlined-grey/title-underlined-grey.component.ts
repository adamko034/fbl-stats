import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-title-underlined-grey',
  templateUrl: './title-underlined-grey.component.html',
  styleUrls: ['./title-underlined-grey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleUnderlinedGreyComponent {}
