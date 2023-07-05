import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { PlayersListOnSaleResolver } from './resolvers/players-list-on-sale.resolver';
import { PlayersListReturningResolver } from './resolvers/players-list-returning.resolver';
import { PlayersListSuspensionRiskResolver } from './resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableResolver } from './resolvers/players-list-unavailable.resolver';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListSuspensionRiskComponent } from './views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';
import { PlayersListsOnSaleComponent } from './views/players-lists-on-sale/players-lists-on-sale.component';

const routes: Routes = [
  {
    path: 'suspensionrisk',
    title: 'Suspension Risk Players',
    data: { pageTitle: 'Suspension Risk Players' },
    canActivate: [PageTitleGuard],
    resolve: { players: PlayersListSuspensionRiskResolver },
    component: PlayersListSuspensionRiskComponent
  },
  {
    path: 'returning',
    title: 'Returning Players',
    data: { pageTitle: 'Returning Players' },
    canActivate: [PageTitleGuard],
    component: PlayersListReturningComponent,
    resolve: { players: PlayersListReturningResolver }
  },
  {
    path: 'unavailable',
    title: 'Unavailable Players',
    data: { pageTitle: 'Unavailable Players' },
    canActivate: [PageTitleGuard],
    resolve: { players: PlayersListUnavailableResolver },
    component: PlayersListUnavailableComponent
  },
  {
    path: 'onsale',
    title: 'On Sale Players',
    data: { pageTitle: 'On Sale Players' },
    canActivate: [PageTitleGuard],
    resolve: { players: PlayersListOnSaleResolver },
    component: PlayersListsOnSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersListsRoutingModule {}
