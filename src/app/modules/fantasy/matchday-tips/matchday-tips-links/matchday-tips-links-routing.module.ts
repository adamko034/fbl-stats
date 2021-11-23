import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsLinksLoadedGuard } from 'src/app/modules/core/tips/guards/matchday-tips-links-loaded.guard';
import { MatchdayTipsLinksResolver } from 'src/app/modules/core/tips/resolvers/matchday-tips-links.resolver';
import { MatchdayTipsLinksComponent } from './views/matchday-tips-links.component';

const routes: Routes = [
  {
    path: '',
    resolve: { tips: MatchdayTipsLinksResolver },
    canActivate: [MatchdayTipsLinksLoadedGuard],
    component: MatchdayTipsLinksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsLinksRoutingModule {}
