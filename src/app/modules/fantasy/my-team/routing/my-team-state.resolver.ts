// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { combineLatest, Observable } from 'rxjs';
// import { first, map, tap } from 'rxjs/operators';
// import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
// import { PropertiesStore } from 'src/app/store/properties/properties.store';
// import { Logger } from 'src/app/utils/logger';
// import { MyTeamState } from '../models/my-team-state.model';
// import { MyTeamPlayersFitlersService } from '../services/my-team-players-filters.service';
// import { MyTeamTilesDisplaySettingsService } from '../services/my-team-tiles-display-settings.service';

// @Injectable()
// export class MyTeamStateResolver implements Resolve<Observable<MyTeamState>> {
//   constructor(
//     private myTeamStore: MyTeamStore,
//     private myTeamFiltersService: MyTeamPlayersFitlersService,
//     private myTeamDisplaySettingsService: MyTeamTilesDisplaySettingsService,
//     private protertiesStore: PropertiesStore
//   ) {}

//   public resolve(): Observable<MyTeamState> {
//     Logger.logDev('my team state resolver, resolving...');

//     return combineLatest([
//       this.myTeamStore.select(),
//       this.myTeamFiltersService.select(),
//       this.myTeamDisplaySettingsService.select(),
//       this.protertiesStore.selectLastMatchday()
//     ]).pipe(
//       tap((_) => Logger.logDev('my team state resolver, got data')),
//       map(([players, filters, displaySettings, lastMatchday]) => ({ players, filters, displaySettings, lastMatchday })),
//       first()
//     );
//   }
// }
