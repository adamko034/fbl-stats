import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-subnavigation',
  templateUrl: './subnavigation.component.html',
  styleUrls: ['./subnavigation.component.scss']
})
export class SubnavigationComponent implements OnInit {
  @Input() links: NavigationLink[];

  public show$: Observable<boolean>;

  constructor(private router: Router, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.show$ = this.screenSizeService.onResize().pipe(map((size) => size > ScreenSize.XS));
  }

  // public isDropdownActive(path: string): boolean {
  //   return this.router.url.includes(path);
  // }

  // public activeLinkFromDropdown(link: NavigationLink): string {
  //   const active = link.dropdownLinks.find((x) => this.isDropdownActive(x.path));
  //   return !!active ? active.text : '';
  // }
}
