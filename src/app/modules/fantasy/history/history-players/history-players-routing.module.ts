import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPlayersLoadedGuard } from './guards/history-players-loaded.guard';
import { HistoryPlayersResolver } from './resolvers/history-players.resolver';
import { HistoryPlayersComponent } from './views/history-players/history-players.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HistoryPlayersLoadedGuard],
    resolve: { players: HistoryPlayersResolver },
    component: HistoryPlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPlayersRoutingModule {}
