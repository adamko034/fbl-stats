import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-history-content',
  templateUrl: './history-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryContentComponent {}
