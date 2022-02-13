import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsUnlimitedTransfersRoutingModule } from './matchday-tips-unlimited-transfers-routing.module';
import { MatchdayTipsUnlimitedTransfersResolver } from './routing/matchday-tips-unlimited-transfers.resolver';
import { MatchdayTipsUnlimitedTransfersComponent } from './views/matchday-tips-unlimited-transfers.component';

@NgModule({
  declarations: [MatchdayTipsUnlimitedTransfersComponent],
  imports: [CommonModule, MatchdayTipsUnlimitedTransfersRoutingModule, AngularMaterialModule, SharedModule],
  providers: [MatchdayTipsUnlimitedTransfersResolver]
})
export class MatchdayTipsUnlimitedTransfersModule {}
