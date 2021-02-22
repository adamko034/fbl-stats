import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  public login(email: string, password: string): Observable<{ success: boolean }> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.router.navigateByUrl('/fantasy/players')),
      mapTo({ success: true }),
      catchError(() => of({ success: false }))
    );
  }

  public isLogged(): Observable<boolean> {
    return this.auth.user.pipe(map((user) => !!user));
  }
}
