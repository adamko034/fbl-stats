import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent {
  @Input() gridColumnWidth = 200;

  public get gridTemplateColumns(): string {
    return `repeat(auto-fill, ${this.gridColumnWidth}px)`;
  }

  private _isOpened = false;
  public get isOpened() {
    return this._isOpened;
  }

  constructor() {}

  public toggleExpand() {
    this._isOpened = !this._isOpened;
  }
}
