import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Properties } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class PropertiesResolver implements Resolve<Properties> {
  constructor(private _propertiesStore: PropertiesStore) {}

  public resolve(): Observable<Properties> {
    Logger.logDev('properties resolver, resolving...');
    return this._propertiesStore.selectProperties().pipe(
      tap(() => Logger.logDev(`properties resolved, resolved properties`)),
      first()
    );
  }
}
