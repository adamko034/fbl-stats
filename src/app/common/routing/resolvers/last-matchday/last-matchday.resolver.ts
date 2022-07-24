import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class LastMatchdayResolver implements Resolve<number> {
  constructor(private _propertiesStore: PropertiesStore) {}

  public resolve(): Observable<number> {
    Logger.logDev('last matchday resolver, resolving...');
    return this._propertiesStore.selectLastMatchday().pipe(
      tap((lastMatchday) => Logger.logDev(`last matchday resolver, resolvied: ${lastMatchday}`)),
      first()
    );
  }
}
