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
        redirectTo: 'pointsefficiency',
        pathMatch: 'full'
      },
      {
        path: 'pointsefficiency',
        loadChildren: () =>
          import('./players-points-efficiency/players-points-efficiency.module').then(
            (m) => m.PlayersPointsEfficiencyModule
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
