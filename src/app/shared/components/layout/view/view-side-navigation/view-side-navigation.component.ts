import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-view-side-navigation',
  templateUrl: './view-side-navigation.component.html',
  styleUrls: ['./view-side-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSideNavigationComponent implements OnInit {
  @Input() links: NavigationLink[];

  constructor() {}

  ngOnInit(): void {}
}
