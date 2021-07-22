import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { SelectTeamsModalComponent } from './select-teams-modal/select-teams-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-select-teams',
  templateUrl: './select-teams.component.html',
  styleUrls: ['./select-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTeamsComponent implements OnInit {
  @Input() selected: string[];
  @Output() selectionChange = new EventEmitter<string[]>();

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  public openDialog(): void {
    this.matDialog
      .open(SelectTeamsModalComponent, {
        data: { selected: [...this.selected] }
      })
      .afterClosed()
      .pipe(
        filter((teams) => !!teams),
        untilDestroyed(this)
      )
      .subscribe((chosenTeams: string[]) => {
        this.selectionChange.emit(chosenTeams);
      });
  }
}
