import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
