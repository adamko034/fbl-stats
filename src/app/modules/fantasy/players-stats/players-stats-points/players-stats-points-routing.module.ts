import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { PlayersStatsPointsResolver } from './resolvers/players-stats-points.resolver';
import { PlayersStatsPointsComponent } from './views/players-stats-points/players-stats-points.component';

const routes: Routes = [
  {
    path: '',
    title: 'Players Stats: Fantasy Points',
    resolve: { players: PlayersStatsPointsResolver },
    component: PlayersStatsPointsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'Players Stats: Fantasy Points', pageTitleMobile: 'Fantasy Points' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsPointsRoutingModule {}
