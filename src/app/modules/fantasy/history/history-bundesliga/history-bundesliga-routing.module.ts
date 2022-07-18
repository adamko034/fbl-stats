import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryBundesligaComponent,
    resolve: { history: HistorySeasonChildResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryBundesligaRoutingModule {}
