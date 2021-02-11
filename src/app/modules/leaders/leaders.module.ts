import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersMatchdayLatestGuard } from './guards/leaders-matchdays-latest.guard';
import { LeadersContentComponent } from './leaders-content/leaders-content.component';
import { LeadersNavigationComponent } from './leaders-content/leaders-navigation/leaders-navigation.component';
import { LeadersRoutingModule } from './leaders-routing.module';
import { LeadersMatchdayResolver } from './resolvers/leaders-matchday.resolver';
import { LeadersMatchdaysNumbersResolver } from './resolvers/leaders-matchdays-numbers.resolver';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';
import { LeadersFormationsUsageComponent } from './components/leaders-formations-usage/leaders-formations-usage.component';

@NgModule({
  declarations: [LeadersContentComponent, LeadersNavigationComponent, LeadersMatchdayComponent, LeadersFormationsUsageComponent],
  imports: [CommonModule, LeadersRoutingModule, SharedModule, AngularMaterialModule],
  providers: [LeadersLoadedGuard, LeadersMatchdaysNumbersResolver, LeadersMatchdayLatestGuard, LeadersMatchdayResolver]
})
export class LeadersModule {}
