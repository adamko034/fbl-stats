import { Component, OnInit } from '@angular/core';
import { NavigationLink } from 'src/app/shared/components/layout/subnavigation/model/navigation-link.model';

@Component({
  selector: 'app-players-navigation',
  templateUrl: './players-navigation.component.html',
  styleUrls: ['./players-navigation.component.scss']
})
export class PlayersNavigationComponent implements OnInit {
  public links: NavigationLink[] = [
    { order: 1, path: '', text: 'players' },
    {
      order: 2,
      path: 'lists',
      text: 'lists',
      isDropdown: true,
      dropdownLinks: [
        { order: 1, path: 'lists/suspensionrisk', text: 'suspension risk' },
        { order: 2, path: 'lists/unavailable', text: 'unavailable' },
        { order: 3, path: 'lists/returning', text: 'returning' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
