import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TeamProperty } from 'src/app/store/teams/models/team-property.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';

@UntilDestroy()
@Component({
  selector: 'app-select-teams-modal',
  templateUrl: './select-teams-modal.component.html',
  styleUrls: ['./select-teams-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTeamsModalComponent implements OnInit {
  private allTeams: TeamProperty[];

  public searchTerm: string;
  public selected: string[];
  public displayedTeams: TeamProperty[];

  constructor(
    private teamsStore: TeamsStore,
    private dialogRef: MatDialogRef<SelectTeamsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selected: string[] }
  ) {}

  public ngOnInit(): void {
    this.selected = [...this.data.selected];
    this.teamsStore
      .selectAllNames()
      .pipe(untilDestroyed(this))
      .subscribe((teams) => {
        this.allTeams = [...teams];
        this.displayedTeams = [...teams];
      });
  }

  public isTeamSelected(team: TeamProperty): boolean {
    return this.selected.includes(team.short);
  }

  public close(): void {
    this.dialogRef.close(this.selected);
  }

  public onSearch(): void {
    if (!!this.searchTerm || this.searchTerm === '') {
      this.displayedTeams = this.allTeams.filter(
        (t) =>
          t.name.toLocaleLowerCase().includes(this.searchTerm) || t.short.toLocaleLowerCase().includes(this.searchTerm)
      );
    }
  }

  public onTeamToggle(change: MatCheckboxChange, team: TeamProperty): void {
    if (change.checked) {
      this.selected.push(team.short);
    } else {
      this.selected = this.selected.filter((x) => x !== team.short);
    }
  }

  public onUnselectAll(): void {
    this.selected = [];
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.displayedTeams = [...this.allTeams];
  }

  public trackTeamsBy(index, item: string) {
    return item;
  }
}
