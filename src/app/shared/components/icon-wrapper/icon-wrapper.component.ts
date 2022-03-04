import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-wrapper',
  templateUrl: './icon-wrapper.component.html',
  styleUrls: ['./icon-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconWrapperComponent implements OnInit {
  @Input() size: number = 16;
  constructor() {}

  ngOnInit(): void {}
}
