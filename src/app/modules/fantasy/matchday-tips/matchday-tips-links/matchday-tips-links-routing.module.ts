import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { MatchdayTipsLinksLoadedGuard } from 'src/app/modules/core/matchday-tips/links/guards/matchday-tips-links-loaded.guard';
import { MatchdayTipsLinksResolver } from 'src/app/modules/core/matchday-tips/links/resolvers/matchday-tips-links.resolver';
import { MatchdayTipsLinksComponent } from './views/matchday-tips-links.component';

const routes: Routes = [
  {
    path: '',
    resolve: { tips: MatchdayTipsLinksResolver, lastMatchday: LastMatchdayResolver },
    title: 'Matchday Tips Links',
    canActivate: [MatchdayTipsLinksLoadedGuard, PageTitleGuard],
    component: MatchdayTipsLinksComponent,
    data: { pageTitle: 'Matchday Tips: Links' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsLinksRoutingModule {}
