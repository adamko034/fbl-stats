import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, mapTo } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';

@Injectable()
export class OurPicksLatestGuard implements CanActivate {
  constructor(private propertiesService: PropertiesService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    Logger.logDev('our picks latest guard');
    return this.propertiesService.selectLastMatchday().pipe(
      map((lastMatchday) => {
        if (!!route.params.matchday && route.params.matchday === 'latest') {
          Logger.logDev('our picks root guard, no matchday specified, navigating to last MD');
          this.router.navigateByUrl(`/fantasy/our-picks/${lastMatchday + 1}`);
        }

        return true;
      }),
      first()
    );
  }
}
