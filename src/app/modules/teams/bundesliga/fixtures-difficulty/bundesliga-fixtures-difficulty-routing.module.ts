import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesDifficultyByFormResolver } from './resolvers/fixtures-difficulty-by-form.resolver';
import { FixturesDifficultyByRankResolver } from './resolvers/fixtures-difficulty-by-rank.resolver';
import { FixturesDifficultyByFormComponent } from './view/fixtures-difficulty-by-form/fixtures-difficulty-by-form.component';
import { FixturesDifficultyByRankComponent } from './view/fixtures-difficulty-by-rank/fixtures-difficulty-by-rank.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'byRank',
    pathMatch: 'full'
  },
  {
    path: 'byRank',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: FixturesDifficultyByRankComponent,
    resolve: { state: FixturesDifficultyByRankResolver }
  },
  {
    path: 'byForm',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: FixturesDifficultyByFormComponent,
    resolve: { state: FixturesDifficultyByFormResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaFixturesDifficultyRoutingModule {}
