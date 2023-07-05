import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistorySummaryComponent } from './views/history-summary.component';

const routes: Routes = [
  {
    path: '',
    component: HistorySummaryComponent,
    title: 'History: Summary',
    resolve: { history: HistorySeasonChildResolver },
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'History: Summary' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorySummaryRoutingModule {}
