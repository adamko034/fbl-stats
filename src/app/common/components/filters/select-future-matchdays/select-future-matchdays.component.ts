import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-future-matchdays',
  templateUrl: './select-future-matchdays.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFutureMatchdaysComponent implements OnInit {
  @Input() value: number;
  @Input() maxMatchday = 34;
  @Input() lastMatchday: number;

  @Output() change = new EventEmitter<number>();

  private _mds: number[] = [];
  public get mds(): number[] {
    return this._mds;
  }

  public ngOnInit(): void {
    for (let i = 1; i <= this.maxMatchday - this.lastMatchday; i++) {
      this._mds.push(i);
    }
  }

  public onMatchdaysChange(md: number): void {
    this.change.emit(md);
  }
}
