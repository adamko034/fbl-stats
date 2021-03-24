import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersListReturningResolver } from './resolvers/players-list-returning.resolver';
import { PlayersListScoringChancesResolver } from './resolvers/players-list-scoring-chances.resolver';
import { PlayersListSuspensionRiskResolver } from './resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableResolver } from './resolvers/players-list-unavailable.resolver';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListScoringChancesComponent } from './views/players-list-scoring-chances/players-list-scoring-chances.component';
import { PlayersListSuspensionRiskComponent } from './views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';

const routes: Routes = [
  {
    path: 'suspensionrisk',
    resolve: { players: PlayersListSuspensionRiskResolver },
    component: PlayersListSuspensionRiskComponent
  },
  {
    path: 'returning',
    component: PlayersListReturningComponent,
    resolve: { players: PlayersListReturningResolver }
  },
  {
    path: 'unavailable',
    resolve: { players: PlayersListUnavailableResolver },
    component: PlayersListUnavailableComponent
  },
  {
    path: 'scoringChances',
    redirectTo: 'scoringChances/overall',
    pathMatch: 'full'
  },
  {
    path: 'scoringChances',
    children: [
      {
        path: ':type',
        resolve: { scoringChances: PlayersListScoringChancesResolver },
        component: PlayersListScoringChancesComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersListsRoutingModule {}
