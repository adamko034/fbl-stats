import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { PositionsStatsLoadedGuard } from './guards/positions-stats-loaded.guard';
import { PlayerDetailsResolver } from './resolvers/player-details.resolver';
import { PositionsStatsResolver } from './resolvers/positions-stats.resolver';
import { PlayerDetailsContentComponent } from './view/player-details-content/player-details-content.component';

const routes: Routes = [
  {
    path: ':id',
    title: 'Player Details',
    data: { pageTitle: 'Player Details' },
    canActivate: [PositionsStatsLoadedGuard, PageTitleGuard],
    component: PlayerDetailsContentComponent,
    resolve: { player: PlayerDetailsResolver, positionsStats: PositionsStatsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerDetailsRoutingModule {}
