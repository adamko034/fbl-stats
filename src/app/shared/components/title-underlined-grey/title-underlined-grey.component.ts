import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-underlined-grey',
  templateUrl: './title-underlined-grey.component.html',
  styleUrls: ['./title-underlined-grey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleUnderlinedGreyComponent implements OnInit {
  @Input() layoutAlign: string = 'start stretch';

  constructor() {}

  ngOnInit(): void {}
}
