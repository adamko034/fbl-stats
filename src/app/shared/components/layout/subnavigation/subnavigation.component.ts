import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationLink } from 'src/app/shared/components/layout/subnavigation/model/navigation-link.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-subnavigation',
  templateUrl: './subnavigation.component.html',
  styleUrls: ['./subnavigation.component.scss']
})
export class SubnavigationComponent {
  @Input() links: NavigationLink[];

  constructor() {}
}
