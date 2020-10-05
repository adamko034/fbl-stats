import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Properties } from 'src/app/models/properties.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly midfieldersCollection = 'midfielders';
  private readonly forwardsCollection = 'forwards';
  private readonly defendersCollection = 'defenders';
  private readonly goalkeepersCollection = 'goalkeepers';

  constructor(private firestore: AngularFirestore) {}

  public getMidfielders(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.midfieldersCollection).valueChanges();
  }

  public getForwards(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.forwardsCollection).valueChanges();
  }

  public getDefenders(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.defendersCollection).valueChanges();
  }

  public getGoalkeepers(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.goalkeepersCollection).valueChanges();
  }

  public getProperties(): Observable<Properties> {
    return this.firestore.collection('properties').doc<Properties>('general').valueChanges();
  }
}
