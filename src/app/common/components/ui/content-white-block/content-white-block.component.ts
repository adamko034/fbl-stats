import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-white-block',
  templateUrl: './content-white-block.component.html',
  styleUrls: ['./content-white-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentWhiteBlockComponent {
  @Input() noPadding = false;
  @Input() padding: string = '';

  public get style(): any {
    if (!this.noPadding && !!this.padding) {
      return { padding: this.padding };
    }
  }

  constructor() {}
}
