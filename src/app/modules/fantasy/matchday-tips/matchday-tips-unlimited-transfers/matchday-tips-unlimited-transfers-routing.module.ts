import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsUnlimitedTransfersResolver } from './routing/matchday-tips-unlimited-transfers.resolver';
import { MatchdayTipsUnlimitedTransfersComponent } from './views/matchday-tips-unlimited-transfers.component';

const routes: Routes = [
  {
    path: '',
    component: MatchdayTipsUnlimitedTransfersComponent,
    title: 'FBL Matchday Tips Unlimited Transfers',
    resolve: { state: MatchdayTipsUnlimitedTransfersResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsUnlimitedTransfersRoutingModule {}
