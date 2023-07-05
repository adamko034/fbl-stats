import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadersTextValueDialgComponent } from './components/leaders-text-value-dialg/leaders-text-value-dialg.component';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersRoutingModule } from './leaders-routing.module';
import { LeadersTop100Resolver } from './resolvers/leaders-top100.resolver';
import { LeadersTop500Resolver } from './resolvers/leaders-top500.resolver';
import { LeadersContentComponent } from './views/leaders-content/leaders-content.component';
import { LeadersFormationsUsageComponent } from './views/leaders-matchday/leaders-general-stats/leaders-formations-usage/leaders-formations-usage.component';
import { LeadersGeneralStatsComponent } from './views/leaders-matchday/leaders-general-stats/leaders-general-stats.component';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';
import { LeadersPlayersPositionComponent } from './views/leaders-matchday/leaders-players-positions/leaders-players-position/leaders-players-position.component';
import { LeadersPlayersPositionsComponent } from './views/leaders-matchday/leaders-players-positions/leaders-players-positions.component';

@NgModule({
  declarations: [
    LeadersContentComponent,
    LeadersMatchdayComponent,
    LeadersFormationsUsageComponent,
    LeadersTextValueDialgComponent,
    LeadersPlayersPositionsComponent,
    LeadersPlayersPositionComponent,
    LeadersGeneralStatsComponent
  ],
  imports: [
    CommonModule,
    LeadersRoutingModule,
    SharedModule,
    AngularMaterialModule,
    AdBannerModule,
    CommonGuardsModule
  ],
  providers: [LeadersLoadedGuard, LeadersTop100Resolver, LeadersTop500Resolver]
})
export class LeadersModule {}
