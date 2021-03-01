import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { AdminOurPicksState } from '../../../our-picks/models/admin-our-picks-state.model';

@Component({
  selector: 'app-admin-our-picks-totals',
  templateUrl: './admin-our-picks-totals.component.html',
  styleUrls: ['./admin-our-picks-totals.component.scss']
})
export class AdminOurPicksTotalsComponent implements OnInit {
  @Input() state: AdminOurPicksState;

  public Types = OurPicksType;

  constructor() {}

  ngOnInit(): void {}
}
