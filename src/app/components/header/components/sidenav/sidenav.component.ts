import { Component, OnInit } from '@angular/core';
import { NavigationMode } from 'src/app/components/header/components/header-navigation/header-navigation.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public navigationMode = NavigationMode.VERTICAL;

  constructor() {}

  ngOnInit(): void {}
}
