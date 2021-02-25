import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    this.authService
      .logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => window.location.reload());
  }
}
