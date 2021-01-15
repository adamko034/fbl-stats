import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.scss']
})
export class ViewLayoutComponent implements OnInit {
  @Input() title: string;
  @Input() contentNoPadding = false;

  constructor() {}

  ngOnInit(): void {}
}
