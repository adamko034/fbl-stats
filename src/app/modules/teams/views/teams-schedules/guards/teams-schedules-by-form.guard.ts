import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class TeamsSchedulesByFormGuard implements CanActivate {
  public canActivate(route: ActivatedRouteSnapshot): boolean {
    // const matchdays = route.queryParams.matchdaysCount;

    // return matchdays === '2' || matchdays === '3' || matchdays === '4' || matchdays === '5';
    return true;
  }
}
