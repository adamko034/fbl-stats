import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesKickoffTimesResolver } from './routing/fixtures-kickoff-times.resolver';
import { FixturesKickoffTimesComponent } from './view/fixtures-kickoff-times.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesKickoffTimesComponent,
    resolve: { state: FixturesKickoffTimesResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesKickoffTimesRoutingModule {}
