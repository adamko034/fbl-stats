import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';

// const routes: Routes = [
//   {
//     path: '',
//     canActivate: [FixturesLoadedGuard],
//     component: MatchdaysFirstGamesComponent,
//     children: [
//       { path: '', redirectTo: 'nextmatchdays', pathMatch: 'full' },
//       { path: 'overall', component: FirstGamesByTeamsComponent, resolve: { teams: TeamsMatchdaysFirstGamesResolver } },
//       {
//         path: 'nextmatchdays',
//         component: FirstGamesByMatchdayComponent,
//         resolve: { matchdays: NextMatchdaysFirstGamesResolver }
//       }
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard],
    component: FixturesFirstGamesComponent,
    resolve: { state: FixturesFirstGamesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesFirstGamesRoutingModule {}
