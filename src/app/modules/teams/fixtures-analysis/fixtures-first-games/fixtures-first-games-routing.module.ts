import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LastKnownMatchdayResolver } from 'src/app/common/routing/resolvers/last-known-matchday/last-known-matchday.resolver';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { NextUnlimitedTransfersResover } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.resolver';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard, PageTitleGuard],
    component: FixturesFirstGamesComponent,
    title: 'Fixtures Analysis: First Games',
    resolve: {
      state: FixturesFirstGamesResolver,
      lastMatchday: LastMatchdayResolver,
      lastKnownMatchday: LastKnownMatchdayResolver,
      nextUnlimitedTransfers: NextUnlimitedTransfersResover
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: { pageTitle: 'Fixtures Analysis: First Games' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesFirstGamesRoutingModule {}
