import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class StoreSourceDeciderService {
  private source = 'firebase';

  constructor(private firestore: AngularFirestore) {
    // this.firestore
    //   .collection('properties')
    //   .doc('dev')
    //   .valueChanges()
    //   .pipe(
    //     distinctUntilChanged(),
    //     filter((dev: { source: string }) => !!dev.source)
    //   )
    //   .subscribe(({ source }) => {
    //     this.source = source;
    //   });
  }

  public isFirebase(): boolean {
    return false;
    // return environment.production && this.source.toLowerCase() === 'firebase';
  }
}
