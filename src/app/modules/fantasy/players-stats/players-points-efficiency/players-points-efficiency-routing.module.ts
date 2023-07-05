import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { PlayersPointsEffciencyResolver } from './resolvers/players-points-efficiency.resolver';
import { PlayersPointsEfficiencyComponent } from './views/players-points-efficiency.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overall',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: ':type',
        resolve: { pointsEfficiency: PlayersPointsEffciencyResolver },
        title: 'FBL Players Stats Points Efficiency',
        canActivate: [PageTitleGuard],
        data: { pageTitle: 'Players Stats: Points Efficiency' },
        component: PlayersPointsEfficiencyComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersPointsEfficiencyRoutingModule {}
