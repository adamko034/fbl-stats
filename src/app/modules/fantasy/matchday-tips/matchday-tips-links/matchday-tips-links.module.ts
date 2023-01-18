import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsLinksRoutingModule } from './matchday-tips-links-routing.module';
import { MatchdayTipsLinksComponent } from './views/matchday-tips-links.component';

@NgModule({
  declarations: [MatchdayTipsLinksComponent],
  imports: [
    CommonModule,
    MatchdayTipsLinksRoutingModule,
    SharedModule,
    AngularMaterialModule,
    LastMatchdayResolverModule,
    PipesModule,
    FollowUsModule,
    AdBannerModule
  ]
})
export class MatchdayTipsLinksModule {}
