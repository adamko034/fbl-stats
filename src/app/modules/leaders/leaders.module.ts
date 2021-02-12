import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadersTextValueDialgComponent } from './components/dialogs/leaders-text-value-dialg/leaders-text-value-dialg.component';
import { LeadersFormationsUsageComponent } from './components/leaders-formations-usage/leaders-formations-usage.component';
import { LeadersPlayersPositionsComponent } from './components/leaders-players-positions/leaders-players-positions.component';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersMatchdayLatestGuard } from './guards/leaders-matchdays-latest.guard';
import { LeadersContentComponent } from './leaders-content/leaders-content.component';
import { LeadersNavigationComponent } from './leaders-content/leaders-navigation/leaders-navigation.component';
import { LeadersRoutingModule } from './leaders-routing.module';
import { LeadersMatchdayResolver } from './resolvers/leaders-matchday.resolver';
import { LeadersMatchdaysNumbersResolver } from './resolvers/leaders-matchdays-numbers.resolver';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';
import { LeadersPlayersPositionComponent } from './components/leaders-players-positions/leaders-players-position/leaders-players-position.component';

@NgModule({
  declarations: [
    LeadersContentComponent,
    LeadersNavigationComponent,
    LeadersMatchdayComponent,
    LeadersFormationsUsageComponent,
    LeadersTextValueDialgComponent,
    LeadersPlayersPositionsComponent,
    LeadersPlayersPositionComponent
  ],
  imports: [CommonModule, LeadersRoutingModule, SharedModule, AngularMaterialModule],
  providers: [LeadersLoadedGuard, LeadersMatchdaysNumbersResolver, LeadersMatchdayLatestGuard, LeadersMatchdayResolver]
})
export class LeadersModule {}
