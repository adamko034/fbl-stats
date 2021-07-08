import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SmartTeamsSelectionBy } from '../../../models/smart-selects/smart-teams-selecetion-by.enum';
import { SmartTeamsSelectionDialogResult } from '../../../models/smart-selects/smart-teams-selection-dialog-result';

@Component({
  selector: 'app-smart-teams-selection-dialog',
  templateUrl: './smart-teams-selection-dialog.component.html',
  styleUrls: ['./smart-teams-selection-dialog.component.scss']
})
export class SmartTeamsSelectionDialogComponent {
  public SmartSelections = SmartTeamsSelectionBy;
  public count = 3;

  constructor(private dialogRef: MatDialogRef<SmartTeamsSelectionDialogComponent, SmartTeamsSelectionDialogResult>) {}

  public selectSmartSelection(selection: SmartTeamsSelectionBy): void {
    this.dialogRef.close({ selection, count: this.count });
  }
}
