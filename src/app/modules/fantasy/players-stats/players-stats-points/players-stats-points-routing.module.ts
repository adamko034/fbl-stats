import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatsPointsResolver } from './resolvers/players-stats-points.resolver';
import { PlayersStatsPointsComponent } from './views/players-stats-points/players-stats-points.component';

const routes: Routes = [
  { path: '', resolve: { players: PlayersStatsPointsResolver }, component: PlayersStatsPointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsPointsRoutingModule {}
