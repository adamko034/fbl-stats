import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatsAvgPointsResolver } from './resolvers/players-stats-avg-points.resolver';
import { PlayersStatsAvgPointsComponent } from './views/players-stats-avg-points/players-stats-avg-points.component';

const routes: Routes = [
  {
    path: '',
    resolve: { players: PlayersStatsAvgPointsResolver },
    component: PlayersStatsAvgPointsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsAvgPointsRoutingModule {}
