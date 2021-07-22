import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryContentComponent } from './views/history-content/history-content.component';

const routes: Routes = [
  {
    path: ':season',
    component: HistoryContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'players',
        pathMatch: 'full'
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
