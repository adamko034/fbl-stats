import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { MatchdayTipsLinksLoadedGuard } from 'src/app/modules/core/matchday-tips/links/guards/matchday-tips-links-loaded.guard';
import { MatchdayTipsLinksResolver } from 'src/app/modules/core/matchday-tips/links/resolvers/matchday-tips-links.resolver';
import { MatchdayTipsLinksComponent } from './views/matchday-tips-links.component';

const routes: Routes = [
  {
    path: '',
    resolve: { tips: MatchdayTipsLinksResolver, lastMatchday: LastMatchdayResolver },
    title: 'FBL Matchday Tips Links',
    canActivate: [MatchdayTipsLinksLoadedGuard],
    component: MatchdayTipsLinksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsLinksRoutingModule {}
