import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-arrow',
  templateUrl: './compare-arrow.component.html',
  styleUrls: ['./compare-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareArrowComponent implements OnInit {
  @Input() firstValue: number;
  @Input() secondValue: number;
  @Input() height = 20;
  @Input() scale = 0.8;
  constructor() {}

  ngOnInit(): void {}
}
