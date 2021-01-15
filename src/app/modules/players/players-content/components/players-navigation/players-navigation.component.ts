import { Component, OnInit } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-players-navigation',
  templateUrl: './players-navigation.component.html',
  styleUrls: ['./players-navigation.component.scss']
})
export class PlayersNavigationComponent implements OnInit {
  private key = 'fantasy';
  public links: NavigationLink[] = Navigation.links[this.key].dropdownLinks;

  constructor() {}

  ngOnInit(): void {}
}
