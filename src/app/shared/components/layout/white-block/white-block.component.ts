import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-block',
  templateUrl: './white-block.component.html',
  styleUrls: ['./white-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhiteBlockComponent implements OnInit {
  @Input() noPadding = false;

  constructor() {}

  ngOnInit(): void {}
}
