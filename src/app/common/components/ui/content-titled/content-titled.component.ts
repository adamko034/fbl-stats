import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-titled',
  templateUrl: './content-titled.component.html',
  styleUrls: ['./content-titled.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTitledComponent implements OnInit {
  @Input() layoutAlign: string = 'start stretch';

  constructor() {}

  ngOnInit(): void {}
}
