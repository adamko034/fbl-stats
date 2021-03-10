import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fantasy-content',
  templateUrl: './fantasy-content.component.html',
  styleUrls: ['./fantasy-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
