import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectMoreMatchdaysDialogComponent } from 'src/app/modules/core/players/components/players-select-matchdays/select-more-form-dialog/select-more-matchdays-dialog.component';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-players-select-matchdays',
  templateUrl: './players-select-matchdays.component.html',
  styleUrls: ['./players-select-matchdays.component.scss']
})
export class PlayersSelectMatchdaysComponent implements OnChanges {
  @Input() lastMatchday: number;
  @Input() matchdaysCount: number;
  @Input() labelWidth = 0;

  @Output() matchdaysChange = new EventEmitter<number>();

  public matchdays = 0;
  public items: SwitchItem[] = [];
  public moreItem: SwitchItem;

  constructor(private matDialog: MatDialog) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.matchdaysCount && changes.matchdaysCount.currentValue !== changes.matchdaysCount.previousValue) {
      if (this.items.length === 0) {
        const matchdaysToDisplay = this.lastMatchday < 5 ? this.lastMatchday : 5;
        for (let i = 1; i <= matchdaysToDisplay; i++) {
          this.items.push({ description: i.toString(), value: i });
        }
      }

      this.matchdays = this.lastMatchday < 5 ? this.lastMatchday : this.matchdaysCount;
      this.moreItem = {
        value: this.matchdays > 5 ? this.matchdays : -1,
        matIcon: 'more_vert',
        description: this.matchdays > 5 ? this.matchdays.toString() : ''
      };
    }
  }

  public openDialog(): void {
    const dialogData = {
      data: { matchdays: this.matchdays > 5 ? this.matchdays : 6, lastMatchday: this.lastMatchday }
    };
    this.matDialog
      .open(SelectMoreMatchdaysDialogComponent, dialogData)
      .afterClosed()
      .subscribe((newValueFromDialog) => {
        if (newValueFromDialog) {
          this.emitValue(newValueFromDialog);
        }
      });
  }

  public onFormChanged(newValue: number) {
    Logger.logDev('players filters select form, on form changed, ' + newValue);
    if (newValue === -1 || newValue > 5) {
      this.openDialog();
      return;
    }

    this.emitValue(newValue);
  }

  private emitValue(matchdays: number): void {
    this.matchdaysChange.emit(matchdays);
  }
}
