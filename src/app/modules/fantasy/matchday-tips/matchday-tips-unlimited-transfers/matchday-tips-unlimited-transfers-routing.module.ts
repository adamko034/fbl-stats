import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { MatchdayTipsUnlimitedTransfersResolver } from './routing/matchday-tips-unlimited-transfers.resolver';
import { MatchdayTipsUnlimitedTransfersComponent } from './views/matchday-tips-unlimited-transfers.component';

const routes: Routes = [
  {
    path: '',
    component: MatchdayTipsUnlimitedTransfersComponent,
    title: 'Matchday Tips Unlimited Transfers',
    resolve: { state: MatchdayTipsUnlimitedTransfersResolver },
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'Matchday Tips: Unlimited Transfers' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsUnlimitedTransfersRoutingModule {}
