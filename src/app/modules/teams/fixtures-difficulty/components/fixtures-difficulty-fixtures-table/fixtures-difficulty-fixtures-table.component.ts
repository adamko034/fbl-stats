import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { FixtureDifficultyTableTeam } from '../../models/fixture-difficulty-table-team.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-fixtures-table',
  templateUrl: './fixtures-difficulty-fixtures-table.component.html',
  styleUrls: ['./fixtures-difficulty-fixtures-table.component.scss']
})
export class FixturesDifficultyFixturesTableComponent implements OnInit, AfterViewInit {
  private _teams: FixtureDifficultyTableTeam[] = [];

  @Input() sortDirection: 'asc' | 'dsc' = 'asc';
  @Input() valueColumnHeader: string;

  @Input()
  get teams(): FixtureDifficultyTableTeam[] {
    return this._teams;
  }
  set teams(value: FixtureDifficultyTableTeam[]) {
    if (!!value) {
      this._teams = value;
      this.dataSource.data = new ArrayStream<FixtureDifficultyTableTeam>(this._teams)
        .orderBy('value', this.sortDirection)
        .collect();

      this.changeDetection.detectChanges();
    }
  }

  public get orderBy(): string {
    return this.sortDirection === 'asc' ? 'value' : '-value';
  }

  public isHorizontal$: Observable<boolean>;
  public dataSource: MatTableDataSource<FixtureDifficultyTableTeam> = new MatTableDataSource();

  constructor(private changeDetection: ChangeDetectorRef, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.isHorizontal$ = this.screenSizeService.onResize().pipe(map((screenSize) => screenSize < ScreenSize.MD));
  }

  public ngAfterViewInit(): void {}
}
