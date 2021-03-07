import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';
import { AdminOurPicksMatchday } from '../../../our-picks/models/admin-our-picks-matchday.model';

@Component({
  selector: 'app-admin-our-picks-totals',
  templateUrl: './admin-our-picks-totals.component.html',
  styleUrls: ['./admin-our-picks-totals.component.scss']
})
export class AdminOurPicksTotalsComponent implements OnInit {
  @Input() state: AdminOurPicksMatchday;

  public Types = OurPicksType;

  constructor() {}

  ngOnInit(): void {}
}
