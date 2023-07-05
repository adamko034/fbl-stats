import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { MatchdayTipsTopTeamResolver } from './routing/matchday-tips-top-team.resolver';
import { MatchdayTipsTopTeamComponent } from './views/matchday-tips-top-team.component';

const routes: Routes = [
  {
    path: '',
    title: 'Matchday Tips: Best Team',
    resolve: { state: MatchdayTipsTopTeamResolver },
    component: MatchdayTipsTopTeamComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'Matchday Tips: Best Team' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsTopTeamRoutingModule {}
