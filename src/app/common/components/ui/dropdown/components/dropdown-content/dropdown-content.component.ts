import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-content',
  templateUrl: './dropdown-content.component.html',
  styleUrls: ['./dropdown-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownContentComponent {
  constructor() {}
}
