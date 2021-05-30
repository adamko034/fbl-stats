import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-white-block',
  templateUrl: './white-block.component.html',
  styleUrls: ['./white-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhiteBlockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
