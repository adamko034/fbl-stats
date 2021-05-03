import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {
  @Input() links: NavigationLink[];
  @Input() viewTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
