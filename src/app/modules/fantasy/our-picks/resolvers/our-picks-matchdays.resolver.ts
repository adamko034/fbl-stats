import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { constants } from 'src/app/resources/resources';
import { PropertiesService } from 'src/app/services/properties.service';

@Injectable()
export class OurPicksMatchdaysResolver implements Resolve<number[]> {
  constructor(private propertiesService: PropertiesService) {}

  public resolve(): Observable<number[]> {
    return this.propertiesService.selectLastMatchday().pipe(
      map((lastMatchday: number) => {
        const nextMatchday = lastMatchday === constants.properties.matchdaysCount ? lastMatchday : lastMatchday + 1;

        const matchdays = [];
        for (let i = nextMatchday; i >= 1; i--) {
          matchdays.push(i);
        }

        return matchdays;
      }),
      first()
    );
  }
}
