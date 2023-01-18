import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsUnlimitedTransfersRoutingModule } from './matchday-tips-unlimited-transfers-routing.module';
import { MatchdayTipsUnlimitedTransfersResolver } from './routing/matchday-tips-unlimited-transfers.resolver';
import { MatchdayTipsUnlimitedTransfersComponent } from './views/matchday-tips-unlimited-transfers.component';

@NgModule({
  declarations: [MatchdayTipsUnlimitedTransfersComponent],
  imports: [
    CommonModule,
    MatchdayTipsUnlimitedTransfersRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    IfScreenModule,
    AdBannerModule
  ],
  providers: [MatchdayTipsUnlimitedTransfersResolver]
})
export class MatchdayTipsUnlimitedTransfersModule {}
