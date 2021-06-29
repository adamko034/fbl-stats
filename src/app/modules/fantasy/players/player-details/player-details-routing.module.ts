import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionsStatsLoadedGuard } from './guards/positions-stats-loaded.guard';
import { PlayerDetailsResolver } from './resolvers/player-details.resolver';
import { PositionsStatsResolver } from './resolvers/positions-stats.resolver';
import { PlayerDetailsContentComponent } from './view/player-details-content/player-details-content.component';

const routes: Routes = [
  {
    path: ':id',
    canActivate: [PositionsStatsLoadedGuard],
    component: PlayerDetailsContentComponent,
    resolve: { player: PlayerDetailsResolver, positions: PositionsStatsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerDetailsRoutingModule {}
