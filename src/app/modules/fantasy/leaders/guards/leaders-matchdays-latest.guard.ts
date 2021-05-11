import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class LeadersMatchdayLatestGuard implements CanActivate {
  constructor(private propertiesService: PropertiesService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.propertiesService.selectLastMatchday().pipe(
      map((lastMatchday) => {
        Logger.logDev('leaders matchdays latest guard, checking if latest passed');
        if (!!route.params.matchday && route.params.matchday === 'latest') {
          Logger.logDev(`leaders matchdays latest guard, latest passed, navigating to matchday ${lastMatchday}`);
          this.router.navigateByUrl(`/players/leaders/${lastMatchday}`);
        }

        return true;
      }),
      first()
    );
  }
}
