import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AdminMatchdayTipsOurPicksService } from 'src/app/modules/core/matchday-tips/our-picks/services/admin-matchay-tips-our-picks.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@UntilDestroy()
@Component({
  selector: 'app-players-table-add-our-pick',
  templateUrl: './players-table-add-our-pick.component.html',
  styleUrls: ['./players-table-add-our-pick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableAddOurPickComponent implements OnInit {
  @Input() playerId: number;
  @Input() name: string;

  private nextMatchday: number;

  constructor(
    private ourPicksAdminService: AdminMatchdayTipsOurPicksService,
    private propertiesService: PropertiesStore,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.propertiesService
      .selectLastMatchday()
      .pipe(
        map((lastMatchday) => lastMatchday + 1),
        untilDestroyed(this)
      )
      .subscribe((nextMatchday) => (this.nextMatchday = nextMatchday));
  }

  public addOurPick(): void {
    this.ourPicksAdminService
      .insert(this.playerId, this.nextMatchday)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.toastrService.success(`Added ${this.name}`, 'Our Picks'));
  }
}
