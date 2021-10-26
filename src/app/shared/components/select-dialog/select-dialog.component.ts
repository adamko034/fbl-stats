import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { SelectDialogConfig } from './select-dialog-config.model';
import { SelectDialogDialogComponent } from './select-dialog-dialog/select-dialog-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDialogComponent implements OnInit {
  @Input() config: SelectDialogConfig;
  @Output() change = new EventEmitter<string[]>();

  public get openDialogLabel(): string {
    return this.config.openDialogLabel || 'Select';
  }

  public get noItemsSelectedLabel(): string {
    return this.config.noItemsSelectedLabel || 'No items selected.';
  }

  public get selectedItemsLabel(): string {
    if (!this.config.itemsSelectedLabel) {
      return `${this.selectedCount()} items selected.`;
    }

    return this.config.itemsSelectedLabel.replace('{}', this.selectedCount().toString());
  }

  public get changeToIconOnMobile(): boolean {
    return this.config.onlyIconOnMobile !== null ? this.config.onlyIconOnMobile : true;
  }

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  public openDialog() {
    this.matDialog
      .open(SelectDialogDialogComponent, { data: { title: this.config.label, options: this.config.options } })
      .afterClosed()
      .pipe(
        filter((newSelectedValues) => !!newSelectedValues),
        untilDestroyed(this)
      )
      .subscribe((newSelectedValues: string[]) => {
        this.change.emit(newSelectedValues);
      });
  }

  public selectedCount(): number {
    return this.config.options.filter((option) => option.selected).length;
  }
}
