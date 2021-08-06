import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonPlayersLoadedGuard } from '../guards/history-season-players-loaded.guard';
import { HistoryPlayersResolver } from './resolvers/history-players.resolver';
import { HistoryPlayersComponent } from './views/history-players/history-players.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HistorySeasonPlayersLoadedGuard],
    resolve: { players: HistoryPlayersResolver },
    component: HistoryPlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPlayersRoutingModule {}