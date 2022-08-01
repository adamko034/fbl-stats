import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { DropdownConfig } from '../../ui/dropdown/models/dropdown-config.model';

@Component({
  selector: 'app-select-future-matchdays-panel',
  templateUrl: './select-future-matchdays-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFutureMatchdaysPanelComponent implements OnChanges {
  @Input() label = 'Include next matchdays';
  @Input() value: FromTo;
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;
  @Input() nextUnlimitedTransfersMatchday: number;

  @Output() change = new EventEmitter<FromTo>();

  private _dropdownConfig: DropdownConfig = {
    opened: false,
    title: 'All matchdays'
  };
  public get dropdownConfig(): DropdownConfig {
    return this._dropdownConfig;
  }

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this._dropdownConfig = {
        opened: false,
        title: this.getDropdownTitle()
      };
    }
  }

  public onOnlyWithEstablishedTimesClick(): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.lastKnownMatchday });
  }

  public onUntilUnlimitedTransfersClick(): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.nextUnlimitedTransfersMatchday });
  }

  public onNextTwoClick(): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.lastMatchday + 2 });
  }

  public onNextFourClick(): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.lastMatchday + 4 });
  }

  public onNextSixClick(): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.lastMatchday + 6 });
  }

  public onNextMatchdaysChange(nextMds: number): void {
    this.change.emit({ from: this.lastMatchday + 1, to: this.lastMatchday + nextMds });
  }

  public onMatchdaysBetweenChange(newValue: FromTo): void {
    this.change.emit(newValue);
  }

  private getDropdownTitle() {
    if (this.lastMatchday + 1 === this.value.from && this.value.to === this.lastKnownMatchday) {
      return 'All with established kickoff times';
    }

    if (this.lastMatchday + 1 === this.value.from && this.value.to === this.nextUnlimitedTransfersMatchday) {
      return 'Until unlimited transfers';
    }

    if (this.lastMatchday + 1 === this.value.from) {
      return `Next ${this.value.to - this.value.from + 1} matchdays`;
    }

    return `Matchdays between ${this.value.from} - ${this.value.to}`;
  }
}
