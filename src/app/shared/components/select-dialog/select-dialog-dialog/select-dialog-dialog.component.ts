import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SelectDialogOption } from '../select-dialog-option.model';

@Component({
  selector: 'app-select-dialog-dialog',
  templateUrl: './select-dialog-dialog.component.html',
  styleUrls: ['./select-dialog-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDialogDialogComponent implements OnInit {
  private _options: SelectDialogOption[];

  public get options(): SelectDialogOption[] {
    return this._options;
  }

  public get allSelected(): boolean {
    return this.selectedCount == this.data.options.length;
  }

  public get selectedCount(): number {
    return this._options.filter((o) => o.selected).length;
  }

  constructor(
    private dialogRef: MatDialogRef<SelectDialogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; options: SelectDialogOption[] }
  ) {}

  public ngOnInit(): void {
    this._options = [...this.data.options];
  }

  public onOptionChange(option: SelectDialogOption): void {
    option.selected = !option.selected;
  }

  public selectAll(): void {
    this._options.forEach((option) => (option.selected = true));
  }

  public clear(): void {
    this._options.forEach((option) => (option.selected = false));
  }

  public close(): void {
    const newSelection = new ArrayStream<SelectDialogOption>(this._options)
      .filterQuick((option) => option.selected)
      .collect()
      .map((o) => o.value);

    this.dialogRef.close(newSelection);
  }

  public canConfirm(): boolean {
    return this._options.filter((o) => o.selected).length > 0;
  }
}
