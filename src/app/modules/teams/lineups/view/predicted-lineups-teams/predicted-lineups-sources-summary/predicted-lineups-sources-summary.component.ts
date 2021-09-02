import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PredictedLineupsSource } from '../../../store/models/predicted-lineups-source.model';

@Component({
  selector: 'app-predicted-lineups-sources-summary',
  templateUrl: './predicted-lineups-sources-summary.component.html',
  styleUrls: ['./predicted-lineups-sources-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsSourcesSummaryComponent implements OnInit {
  @Input() sources: PredictedLineupsSource[];

  public indexes: number[] = [0, 1, 2];

  constructor() {}

  ngOnInit(): void {}
}
