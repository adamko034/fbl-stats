import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-block',
  templateUrl: './white-block.component.html',
  styleUrls: ['./white-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhiteBlockComponent implements OnInit {
  @Input() noPadding = false;
  @Input() padding: string = '';

  public get style(): any {
    if (!this.noPadding && !!this.padding) {
      return { padding: this.padding };
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
