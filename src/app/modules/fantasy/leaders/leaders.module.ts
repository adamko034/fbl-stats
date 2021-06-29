import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadersTextValueDialgComponent } from './components/leaders-text-value-dialg/leaders-text-value-dialg.component';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersMatchdayLatestGuard } from './guards/leaders-matchdays-latest.guard';
import { LeadersRoutingModule } from './leaders-routing.module';
import { LeadersMatchdayResolver } from './resolvers/leaders-matchday.resolver';
import { LeadersMatchdaysNumbersResolver } from './resolvers/leaders-matchdays-numbers.resolver';
import { LeadersContentComponent } from './views/leaders-content/leaders-content.component';
import { LeadersNavigationComponent } from './views/leaders-content/leaders-navigation/leaders-navigation.component';
import { LeadersFormationsUsageComponent } from './views/leaders-matchday/leaders-general-stats/leaders-formations-usage/leaders-formations-usage.component';
import { LeadersGeneralStatsComponent } from './views/leaders-matchday/leaders-general-stats/leaders-general-stats.component';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';
import { LeadersPlayersPositionComponent } from './views/leaders-matchday/leaders-players-positions/leaders-players-position/leaders-players-position.component';
import { LeadersPlayersPositionsComponent } from './views/leaders-matchday/leaders-players-positions/leaders-players-positions.component';

@NgModule({
  declarations: [
    LeadersContentComponent,
    LeadersNavigationComponent,
    LeadersMatchdayComponent,
    LeadersFormationsUsageComponent,
    LeadersTextValueDialgComponent,
    LeadersPlayersPositionsComponent,
    LeadersPlayersPositionComponent,
    LeadersGeneralStatsComponent
  ],
  imports: [CommonModule, LeadersRoutingModule, SharedModule, AngularMaterialModule],
  providers: [LeadersLoadedGuard, LeadersMatchdaysNumbersResolver, LeadersMatchdayLatestGuard, LeadersMatchdayResolver]
})
export class LeadersModule {}
