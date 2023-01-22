import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    title: 'FBL Suspension Risk Players',
    resolve: { players: PlayersListSuspensionRiskResolver },
    component: PlayersListSuspensionRiskComponent
  },
  {
    path: 'returning',
    title: 'FBL Returning Players',
    component: PlayersListReturningComponent,
    resolve: { players: PlayersListReturningResolver }
  },
  {
    path: 'unavailable',
    title: 'FBL Unavailable Players',
    resolve: { players: PlayersListUnavailableResolver },
    component: PlayersListUnavailableComponent
  },
  {
    path: 'onsale',
    title: 'FBL On Sale Players',
    resolve: { players: PlayersListOnSaleResolver },
    component: PlayersListsOnSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersListsRoutingModule {}
