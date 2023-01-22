import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistorySummaryComponent } from './views/history-summary.component';

const routes: Routes = [
  {
    path: '',
    component: HistorySummaryComponent,
    title: 'FBL History Summary',
    resolve: { history: HistorySeasonChildResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorySummaryRoutingModule {}
