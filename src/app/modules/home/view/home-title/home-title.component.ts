import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { Properties } from 'src/app/store/properties/properties.model';

@Component({
  selector: 'app-home-title',
  templateUrl: './home-title.component.html',
  styleUrls: ['./home-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTitleComponent implements OnInit {
  @Input() properties: Properties;

  public nowIsUnlimitedTransfers = false;
  public nextUnlimitedTransfers = null;

  constructor(private unlimitedTransfersService: UnlimitedTransfersService) {}

  ngOnInit(): void {
    this.nowIsUnlimitedTransfers = this.unlimitedTransfersService.todayIsWithingUnlimitedTransfers(
      this.properties.unlimitedTransfers.dates
    );

    this.nextUnlimitedTransfers = this.unlimitedTransfersService.nextUnlimitedTransfers(
      this.properties.unlimitedTransfers.dates
    );
  }
}
