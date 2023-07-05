import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryBundesligaComponent,
    title: 'History: Bundesliga Table',
    resolve: { history: HistorySeasonChildResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'History: Bundesliga Table' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryBundesligaRoutingModule {}
