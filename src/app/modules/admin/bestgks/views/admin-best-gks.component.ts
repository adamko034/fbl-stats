import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';
import { Position } from 'src/app/common/players/models/position.enum';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { CompareBestGks } from 'src/app/store/compare/models/compare-best-gks.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';
import { AdminBestGksFacade } from '../admin-bestgks.facade';
import { AdminBestGksState } from '../logic/models/admin-best-gks-state.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-best-gks',
  templateUrl: './admin-best-gks.component.html',
  styleUrls: ['./admin-best-gks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBestGksComponent implements OnInit {
  private _allGks: Player[] = [];
  private _storedGksIds: string[] = [];
  private _selectedGks: Player[] = [];
  private _edited = false;

  public get selectedGks(): Player[] {
    return this._selectedGks;
  }

  public get edited(): boolean {
    return this._edited;
  }

  public GK = Position.GK;

  constructor(private route: ActivatedRoute, private facade: AdminBestGksFacade) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.state),
        tap((_) => Logger.logDev(`admin best gks component, got state`)),
        untilDestroyed(this)
      )
      .subscribe((state: AdminBestGksState) => {
        this._allGks = state.goalkeepers;
        this._storedGksIds = state.bestGks?.ids ?? [];

        this.storedIdsToSelectedPlayers();
      });
  }

  public addGk({ id }: PlayerPicker): void {
    this._edited = true;
    this._selectedGks.push(this.getPlayer(id.toString()));
  }

  public removeGk(id: string): void {
    this._edited = true;
    this._selectedGks = this._selectedGks.filter((p) => p.id.toString() !== id.toString());
  }

  public save(): void {
    const compareBestGks: CompareBestGks = { ids: this._selectedGks.map((p) => p.id) };
    this.facade.save(compareBestGks);

    this._edited = false;
  }

  public cancel(): void {
    this.storedIdsToSelectedPlayers();
    this._edited = false;
  }

  private storedIdsToSelectedPlayers(): void {
    this._selectedGks = new ArrayStream<string>(this._storedGksIds, false)
      .convertQuick<Player>((id) => this.getPlayer(id.toString()))
      .filterQuick((p) => p != null)
      .collect();
  }

  private getPlayer(id: string): Player {
    return this._allGks.find((p) => p.id.toString() === id);
  }
}
