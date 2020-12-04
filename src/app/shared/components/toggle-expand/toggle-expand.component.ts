import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-expand',
  templateUrl: './toggle-expand.component.html',
  styleUrls: ['./toggle-expand.component.scss']
})
export class ToggleExpandComponent {
  @Input() expanded: boolean;
  @Output() toggleExpand = new EventEmitter<void>();

  constructor() {}

  public onToggle(): void {
    this.toggleExpand.emit();
  }
}
