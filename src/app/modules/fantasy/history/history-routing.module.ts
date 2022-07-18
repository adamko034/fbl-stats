import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonLoadedGuard } from './routing/history-season-loaded.guard';
import { HistorySeasonResolver } from './routing/history-season.resolver';
import { HistoryContentComponent } from './views/history-content.component';

const routes: Routes = [
  {
    path: ':season',
    component: HistoryContentComponent,
    canActivate: [HistorySeasonLoadedGuard],
    resolve: { history: HistorySeasonResolver },
    children: [
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full'
      },
      {
        path: 'summary',
        loadChildren: () => import('./history-summary/history-summary.module').then((m) => m.HistorySummaryModule)
      },
      {
        path: 'players',
        loadChildren: () => import('./history-players/history-players.module').then((m) => m.HistoryPlayersModule)
      },
      {
        path: 'bundesliga',
        loadChildren: () =>
          import('./history-bundesliga/history-bundesliga.module').then((m) => m.HistoryBundesligaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {}
