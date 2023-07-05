import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { HistorySeasonChildResolver } from '../routing/history-season-child.resolver';
import { HistoryPlayersComponent } from './views/history-players.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPlayersComponent,
    title: 'History: Fantasy Players',
    resolve: { history: HistorySeasonChildResolver },
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'History: Fantasy Players' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPlayersRoutingModule {}
