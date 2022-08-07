import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsOurPicksResolver } from 'src/app/modules/core/matchday-tips/our-picks/resolvers/matchday-tips-our-picks.resolver';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MatchdayTipsOurPicksLoadedGuard],
    component: MatchdayTipsOurPicksComponent,
    resolve: { ourPicks: MatchdayTipsOurPicksResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsOurPicksRoutingModule {}
