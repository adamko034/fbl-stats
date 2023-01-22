import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersCompareIdsCacheGuard } from './routing/players-compare-ids-cache.guard';
import { PlayersCompareQuickLinkGuard } from './routing/players-compare-quick-link.guard';
import { PlayersCompareStateResolver } from './routing/players-compare-state.resolver';
import { PlayersCompareComponent } from './view/players-compare.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersCompareComponent,
    title: 'FBL Players Compare',
    resolve: { state: PlayersCompareStateResolver },
    canActivate: [PlayersCompareIdsCacheGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: ':type',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [PlayersCompareQuickLinkGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersCompareRoutingModule {}
