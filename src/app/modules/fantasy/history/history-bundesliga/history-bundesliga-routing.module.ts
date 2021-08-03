import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryBundesligaLoadedGuard } from './guards/history-bundesliga-loaded.guard';
import { HistoryBundesligaResolver } from './resolvers/history-bundesliga.resolver';
import { HistoryBundesligaComponent } from './views/history-bundesliga/history-bundesliga.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HistoryBundesligaLoadedGuard],
    resolve: { teams: HistoryBundesligaResolver },
    component: HistoryBundesligaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryBundesligaRoutingModule {}
