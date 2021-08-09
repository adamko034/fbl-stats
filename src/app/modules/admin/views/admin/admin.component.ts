import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@UntilDestroy()
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { order: 1, labelMobile: 'Links', label: 'Links', routerLink: 'tips' },
    { order: 2, label: 'Our picks', labelMobile: 'Our picks', routerLink: 'our-picks' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor(private authService: AuthenticationService) {}

  public ngOnInit(): void {}

  public logout(): void {
    this.authService
      .logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => window.location.reload());
  }
}
