import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { PlayersStatsAvgPointsResolver } from './resolvers/players-stats-avg-points.resolver';
import { PlayersStatsAvgPointsComponent } from './views/players-stats-avg-points/players-stats-avg-points.component';

const routes: Routes = [
  {
    path: '',
    resolve: { players: PlayersStatsAvgPointsResolver, lastMatchday: LastMatchdayResolver },
    title: 'Players Stats: Avg Points',
    component: PlayersStatsAvgPointsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'Players Stats: Avg Points', pageTitleMobile: 'Avg Points' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsAvgPointsRoutingModule {}
