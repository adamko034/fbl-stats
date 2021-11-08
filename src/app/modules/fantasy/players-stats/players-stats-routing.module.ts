import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatsContentComponent } from './views/players-stats-content/players-stats-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersStatsContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'points',
        pathMatch: 'full'
      },
      {
        path: 'points',
        loadChildren: () =>
          import('./players-stats-points/players-stats-points.module').then((m) => m.PlayersStatsPointsModule)
      },
      {
        path: 'pointsefficiency',
        loadChildren: () =>
          import('./players-points-efficiency/players-points-efficiency.module').then(
            (m) => m.PlayersPointsEfficiencyModule
          )
      },
      {
        path: 'gamesplayed',
        loadChildren: () =>
          import('./players-games-played/players-games-played.module').then((m) => m.PlayersGamesPlayedModule)
      },
      {
        path: 'avgpoints',
        loadChildren: () =>
          import('./players-stats-avg-points/players-stats-avg-points.module').then(
            (m) => m.PlayersStatsAvgPointsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsRoutingModule {}
