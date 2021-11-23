import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurPicksResolver } from 'src/app/modules/core/our-picks/resolvers/our-picks.resolver';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks/matchday-tips-our-picks.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OurPicksLoadedGuard],
    component: MatchdayTipsOurPicksComponent,
    resolve: { ourPicks: OurPicksResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurPicksRoutingModule {}
