import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input() value: boolean;
  @Input() label: string;

  @Output() checkboxChange = new EventEmitter<boolean>();

  constructor() {}

  public onChange(change: MatCheckboxChange) {
    this.checkboxChange.emit(change.checked);
  }
}
