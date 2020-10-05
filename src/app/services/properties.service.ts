import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Properties } from 'src/app/models/properties.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  constructor(private firebaseService: FirebaseService) {}

  public loadProperties(): Observable<Properties> {
    return this.firebaseService.getProperties();
  }
}
