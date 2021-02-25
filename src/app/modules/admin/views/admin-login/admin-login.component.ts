import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent {
  public formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  public loginFailed$: Observable<boolean>;

  constructor(private auth: AuthenticationService, private router: Router) {}

  public login(): void {
    this.loginFailed$ = this.auth.login(this.formGroup.get('email').value, this.formGroup.get('password').value).pipe(
      tap((res) => {
        if (res.success) {
          this.router.navigateByUrl('/admin');
        }
      }),
      map((res) => !res.success),
      untilDestroyed(this)
    );
  }
}
