import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatsPointsResolver } from './resolvers/players-stats-points.resolver';
import { PlayersStatsPointsComponent } from './views/players-stats-points/players-stats-points.component';

const routes: Routes = [
  {
    path: '',
    title: 'FBL Players Stats Fantasy Points',
    resolve: { players: PlayersStatsPointsResolver },
    component: PlayersStatsPointsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsPointsRoutingModule {}
