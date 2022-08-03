import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { AdminMatchdayTipsOurPicksService } from 'src/app/modules/core/matchday-tips/our-picks/services/admin-matchay-tips-our-picks.service';

@UntilDestroy()
@Component({
  selector: 'app-players-table-add-our-pick',
  templateUrl: './players-table-add-our-pick.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableAddOurPickComponent implements OnInit {
  @Input() playerId: number;
  @Input() name: string;
  @Input() lastMatchday: number;

  constructor(private ourPicksAdminService: AdminMatchdayTipsOurPicksService, private toastrService: ToastrService) {}

  ngOnInit(): void {}

  public addOurPick(): void {
    this.ourPicksAdminService
      .insert(this.playerId, this.lastMatchday + 1)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.toastrService.success(`Added ${this.name}`, 'Our Picks'));
  }
}
