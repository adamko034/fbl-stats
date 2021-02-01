import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SmartTeamsSelectionDialogResult } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/components/smart-teams-selection-dialog/models/smart-teams-selection-dialog-result';
import { SmartTeamsSelectionBy } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/model/smart-selects/smart-teams-selecetion-by.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-smart-teams-selection-dialog',
  templateUrl: './smart-teams-selection-dialog.component.html',
  styleUrls: ['./smart-teams-selection-dialog.component.scss']
})
export class SmartTeamsSelectionDialogComponent implements OnInit {
  private readonly LOCALSTORAGE_KEY = 'SmartSelections';
  public SmartSelections = SmartTeamsSelectionBy;
  public count = 3;

  constructor(
    private dialogRef: MatDialogRef<SmartTeamsSelectionDialogComponent, SmartTeamsSelectionDialogResult>,
    private localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.count = this.localStorageService.get<number>(this.LOCALSTORAGE_KEY) ?? 3;
  }

  public selectSmartSelection(selection: SmartTeamsSelectionBy): void {
    this.saveCountToLocalStorage();
    this.dialogRef.close({ selection, count: this.count });
  }

  private saveCountToLocalStorage(): void {
    this.localStorageService.upsert(this.LOCALSTORAGE_KEY, this.count);
  }
}