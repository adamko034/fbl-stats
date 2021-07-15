import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-select-teams-from-table',
  templateUrl: './select-teams-from-table.component.html',
  styleUrls: ['./select-teams-from-table.component.scss']
})
export class SelectTeamsFromTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyed$ = new Subject<void>();
  private maxFormCount = 10;

  @ViewChild(MatSort) sort: MatSort;

  public selectedTeams = [];
  public dataSource: MatTableDataSource<Team>;

  private columns = ['select', 'rank', 'team', 'last3Games', 'last5Games', 'gspg', 'gcpg', 'goals', 'form'];
  private columnsMobile = ['select', 'rank', 'team', 'last3Games', 'last5Games', 'gspg', 'gcpg'];

  public displayedColumns: string[];

  constructor(
    private dialogRef: MatDialogRef<SelectTeamsFromTableComponent, string[]>,
    private teamsStore: TeamsStore,
    private responsivenessService: ScreenSizeService,
    @Inject(MAT_DIALOG_DATA) public data: { selectedTeams: string[] }
  ) {}

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public ngOnInit(): void {
    this.teamsStore
      .selectAllWithoutGames()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((teams: Team[]) => {
        Logger.logDev('select teams from table dialog, got teams');
        this.dataSource = new MatTableDataSource(teams);
      });

    this.data.selectedTeams.forEach((team) => this.toggleTeamSelection(team));
    this.responsivenessService.onResize().subscribe((screen) => {
      if (screen <= ScreenSize.XS) {
        this.displayedColumns = [...this.columnsMobile];
        return;
      }

      this.displayedColumns = [...this.columns];
      if (screen === ScreenSize.SM) {
        this.maxFormCount = 3;
        return;
      }

      this.maxFormCount = 10;
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public isSelected(team: string): boolean {
    return this.selectedTeams.includes(team);
  }

  public getFormColumnStyleWidth(form: string): string {
    const count = form.length > this.maxFormCount ? this.maxFormCount : form.length;
    return `width: ${count * 28}px`;
  }

  public getForm(form: string): string {
    const count = form.length > this.maxFormCount ? this.maxFormCount : form.length;
    return form.substring(0, count);
  }

  public toggleTeamSelection(teamShort: string): void {
    const isSelected = this.selectedTeams.includes(teamShort);

    if (isSelected) {
      this.selectedTeams = this.selectedTeams.filter((t) => t !== teamShort);
    } else {
      this.selectedTeams.push(teamShort);
    }
  }

  public confirm() {
    this.dialogRef.close(this.selectedTeams);
  }
}
