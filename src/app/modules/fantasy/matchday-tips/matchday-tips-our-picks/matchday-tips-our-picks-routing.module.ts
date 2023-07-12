import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { MatchdayTipsOurPicksResolver } from 'src/app/modules/core/matchday-tips/our-picks/resolvers/matchday-tips-our-picks.resolver';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks.component';

const routes: Routes = [
  {
    path: '',
    title: 'Matchday Tips: Proposed Picks',
    canActivate: [MatchdayTipsOurPicksLoadedGuard, PageTitleGuard],
    component: MatchdayTipsOurPicksComponent,
    resolve: { ourPicks: MatchdayTipsOurPicksResolver, lastMatchday: LastMatchdayResolver },
    data: { pageTitle: 'Matchday Tips: Proposed Picks', pageTitleMobile: 'Proposed Picks' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsOurPicksRoutingModule {}
