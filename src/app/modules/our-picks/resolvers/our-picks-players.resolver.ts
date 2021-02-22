import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';
import { OurPicksPlayersLoader } from '../loaders/our-picks-players.loader';
import { OurPicksFilters } from '../models/our-picks-filters.model';
import { OurPicksPlayers } from '../models/our-picks-players.model';

@Injectable()
export class OurPicksPlayersResolver implements Resolve<OurPicksPlayers> {
  constructor(private ourPicksLoader: OurPicksPlayersLoader, private propertiesService: PropertiesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<OurPicksPlayers> {
    Logger.logDev('our picks players resolver, resolving ...');
    const matchday = +route.params.matchday;
    return this.propertiesService.selectLastMatchday().pipe(
      switchMap((lastMatchday) => this.ourPicksLoader.load(matchday - 1, lastMatchday)),
      first()
    );
  }
}