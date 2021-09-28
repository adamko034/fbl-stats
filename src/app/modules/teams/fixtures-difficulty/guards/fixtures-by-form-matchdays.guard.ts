import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Injectable()
export class FixturesByFormMatchdaysGuard implements CanActivate {
  constructor(private propertiesStore: PropertiesStore, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    var matchdays = route.queryParams.matchdays;

    return this.propertiesStore.selectLastMatchday().pipe(
      map((lastMatchday) => {
        if (!!matchdays && lastMatchday >= +matchdays) {
          return true;
        }

        const redirectMatchdays = lastMatchday <= 5 ? lastMatchday : 5;
        this.router.navigate(['teams', 'fixturesdifficulty', 'byForm'], {
          queryParams: { matchdays: redirectMatchdays }
        });
      })
    );
  }
}
