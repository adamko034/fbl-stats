import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastKnownMatchdayResolver } from 'src/app/common/routing/resolvers/last-known-matchday/last-known-matchday.resolver';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { NextUnlimitedTransfersResover } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.resolver';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesDifficultyComponent,
    title: 'FBL Fixtures Difficulty',
    resolve: {
      state: FixturesDifficultyResolver,
      lastMatchday: LastMatchdayResolver,
      nextUnlimitedTransfers: NextUnlimitedTransfersResover,
      lastKnownMatchday: LastKnownMatchdayResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesDifficultyRoutingModule {}
