import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsContentComponent } from './views/teams-content/teams-content.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'bundesliga',
        pathMatch: 'full'
      },
      {
        path: 'bundesliga',
        loadChildren: () => import('./bundesliga/bundesliga.module').then((m) => m.BundesligaModule)
      },
      {
        path: 'lineups',
        loadChildren: () => import('./lineups/predicted-lineups.module').then((m) => m.PredictedLineupsModule)
      },
      {
        path: 'firstgames',
        loadChildren: () => import('./first-games/first-games.module').then((m) => m.FirstGamesModule)
      },
      {
        path: 'fixturesdifficulty',
        loadChildren: () =>
          import('./fixtures-difficulty/fixtures-difficulty.module').then((m) => m.FixturesDifficultyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
