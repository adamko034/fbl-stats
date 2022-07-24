import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-icon-my-team-buttons',
  templateUrl: './player-icon-my-team-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIconMyTeamButtonsComponent {
  @Input() showAdd;

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  public onAdd(): void {
    this.add.emit();
  }

  public onRemove(): void {
    this.remove.emit();
  }
}
