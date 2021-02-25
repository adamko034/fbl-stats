import { Injectable } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class OurPicksAdminService {
  constructor(private firebaseService: FirebaseService) {}

  public insert(playerId: number, matchday: number): void {
    this.firebaseService.addOurPick(playerId, matchday);
  }
}
