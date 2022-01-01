import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsTopTeamResolver } from './routing/matchday-tips-top-team.resolver';
import { MatchdayTipsTopTeamComponent } from './views/matchday-tips-top-team.component';

const routes: Routes = [
  {
    path: '',
    resolve: { state: MatchdayTipsTopTeamResolver },
    component: MatchdayTipsTopTeamComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsTopTeamRoutingModule {}
