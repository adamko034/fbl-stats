import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonPlayersLoadedGuard } from '../routing/history-season-players-loaded.guard';
import { HistorySummaryResolver } from './resolvers/history-summary.resolver';
import { HistorySummaryComponent } from './views/history-summary/history-summary.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HistorySeasonPlayersLoadedGuard],
    resolve: { history: HistorySummaryResolver },
    component: HistorySummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorySummaryRoutingModule {}
