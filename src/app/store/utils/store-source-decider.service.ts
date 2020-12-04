import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StoreSourceDeciderService {
  private source = 'firebase';

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('properties')
      .doc('dev')
      .valueChanges()
      .pipe(
        distinctUntilChanged(),
        filter((dev: { source: string }) => !!dev.source)
      )
      .subscribe(({ source }) => {
        Logger.logDev('store source decider, source has changed to ' + source);
        this.source = source;
      });
  }

  public isFirebase(): boolean {
    return environment.production && this.source.toLowerCase() === 'firebase';
  }
}
