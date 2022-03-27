import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesDifficultyComponent,
    resolve: { state: FixturesDifficultyResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesDifficultyRoutingModule {}
