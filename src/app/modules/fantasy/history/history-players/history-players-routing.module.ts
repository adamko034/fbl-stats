import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistoryPlayersComponent } from './views/history-players.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPlayersComponent,
    title: 'FBL History Players',
    resolve: { history: HistorySeasonChildResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPlayersRoutingModule {}
