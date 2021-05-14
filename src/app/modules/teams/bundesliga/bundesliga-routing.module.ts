import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full'
  },
  {
    path: 'firstgames',
    loadChildren: () => import('./first-games/bundesliga-first-games.module').then((m) => m.BundesligaFirstGamesModule)
  },
  {
    path: 'fixturesdifficulty',
    loadChildren: () =>
      import('./fixtures-difficulty/bundesliga-fixtures-difficulty.module').then(
        (m) => m.BundesligaFixturesDifficultyModule
      )
  },
  {
    path: 'table',
    loadChildren: () => import('./table/bundesliga-table.module').then((m) => m.BundesligaTableModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaRoutingModule {}
