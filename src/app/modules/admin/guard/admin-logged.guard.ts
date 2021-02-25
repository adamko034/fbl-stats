import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class AdminLoggedGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isLogged().pipe(
      map((res) => {
        if (res.isLogged) {
          return true;
        }

        this.router.navigateByUrl('/admin/login');
        return false;
      })
    );
  }
}
