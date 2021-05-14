import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsContentComponent } from './views/teams-content/teams-content.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: TeamsContentComponent,
//     children: [
//       {
//         path: 'matchdays',
//         children: [
//           {
//             path: 'firstGames',
//             component: MatchdaysFirstGamesComponent,
//             resolve: { matchdays: NextMatchdaysFirstGamesResolver, teams: TeamsMatchdaysFirstGamesResolver }
//           }
//         ]
//       },

//       {
//         path: 'nextFixtures',
//         component: TeamsSchedulesComponent,
//         children: [
//           { path: '', redirectTo: 'byRank', pathMatch: 'full' },
//           {
//             path: 'byRank',
//             runGuardsAndResolvers: 'paramsOrQueryParamsChange',
//             component: TeamsSchedulesByRankComponent,
//             resolve: { state: TeamsSchedulesByRankResolver }
//           },
//           {
//             path: 'byForm',
//             runGuardsAndResolvers: 'paramsOrQueryParamsChange',
//             component: TeamsSchedulesByFormComponent,
//             canActivate: [TeamsSchedulesByFormGuard],
//             resolve: { state: TeamsSchedulesByFormResolver }
//           }
//         ]
//       },
//       {
//         path: 'table',
//         resolve: { state: TeamsResolver },
//         component: TeamsTableContainerComponent
//       },
//       { path: '', redirectTo: 'table', pathMatch: 'full' },
//       { path: 'matchdays', redirectTo: 'matchdays/firstGames', pathMatch: 'full' }
//     ]
//   }
// ];
const routes: Routes = [
  {
    path: '',
    component: TeamsContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'bundesliga',
        pathMatch: 'full'
      },
      {
        path: 'bundesliga',
        loadChildren: () => import('./bundesliga/bundesliga.module').then((m) => m.BundesligaModule)
      },
      {
        path: 'lineups',
        loadChildren: () => import('./lineups/predicted-lineups.module').then((m) => m.PredictedLineupsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
