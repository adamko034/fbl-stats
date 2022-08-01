import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-section',
  templateUrl: './dropdown-section.component.html',
  styleUrls: ['./dropdown-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownSectionComponent {
  @Input() showDivider = true;
}
