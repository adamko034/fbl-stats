import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesAnalysisComponent } from './view/fixtures-analysis.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'difficulty',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FixturesAnalysisComponent,
    children: [
      {
        path: 'difficulty',
        loadChildren: () =>
          import('./fixtures-difficulty/fixtures-difficulty.module').then((m) => m.FixturesDifficultyModule)
      },
      {
        path: 'firstgames',
        loadChildren: () =>
          import('./fixtures-first-games/fixtures-first-games.module').then((m) => m.FixturesFirstGamesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesAnalysisRoutingModule {}
