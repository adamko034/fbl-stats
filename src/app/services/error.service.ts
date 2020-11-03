import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { errors } from 'src/app/resources/resources';
@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errors$ = new Subject<string>();

  constructor() {}

  public selectError(): Observable<string> {
    return this.errors$.asObservable();
  }

  public sendFirebaseError(): void {
    this.errors$.next(errors.firebaseError);
  }

  public send(error: string): void {
    this.errors$.next(error);
  }

  public close(): void {
    this.errors$ = null;
  }
}
