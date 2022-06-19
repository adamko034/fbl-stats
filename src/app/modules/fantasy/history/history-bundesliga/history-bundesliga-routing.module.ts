import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryBundesligaLoadedGuard } from './routing/history-bundesliga-loaded.guard';
import { HistoryBundesligaResolver } from './routing/history-bundesliga.resolver';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HistoryBundesligaLoadedGuard],
    resolve: { state: HistoryBundesligaResolver },
    component: HistoryBundesligaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryBundesligaRoutingModule {}
