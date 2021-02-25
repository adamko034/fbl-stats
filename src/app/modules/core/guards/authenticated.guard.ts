import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isLogged().pipe(map((res) => res.isLogged));
  }
}
