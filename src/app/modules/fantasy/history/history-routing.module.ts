import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonLoadedGuard } from './guards/history-season-loaded.guard';
import { HistoryContentComponent } from './views/history-content/history-content.component';

const routes: Routes = [
  {
    path: ':season',
    canActivate: [HistorySeasonLoadedGuard],
    component: HistoryContentComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {}
