import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OurPicksAdminService } from 'src/app/modules/core/services/our-picks-admin.service';
import { PropertiesService } from 'src/app/services/properties.service';
@UntilDestroy()
@Component({
  selector: 'app-players-table-add-our-pick',
  templateUrl: './players-table-add-our-pick.component.html',
  styleUrls: ['./players-table-add-our-pick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableAddOurPickComponent implements OnInit {
  @Input() playerId: number;

  private nextMatchday: number;

  constructor(
    private ourPicksAdminService: OurPicksAdminService,
    private propertiesService: PropertiesService,
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
      .subscribe(() => this.toastrService.success('Saved', 'Our Picks'));
  }
}
