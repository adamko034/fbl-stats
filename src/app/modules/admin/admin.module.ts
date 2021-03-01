import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminComponent } from './views/admin/admin.component';
import { AdminOurPicksLoadedGuard } from './guard/admin-our-picks-loaded.guard';
import { AdminOurPicksComponent } from './views/admin-our-picks/admin-our-picks.component';
import { AdminOurPicksResolver } from './resolvers/admin-our-picks.resolver';
import { AdminOurPicksTotalsComponent } from './views/admin-our-picks/admin-our-picks-totals/admin-our-picks-totals.component';
import { FblCoreModule } from '../core/fbl-core.module';
import { AdminOurPicksPlayerSearchComponent } from './views/admin-our-picks/admin-our-picks-player-search/admin-our-picks-player-search.component';
@NgModule({
  declarations: [AdminLoginComponent, AdminComponent, AdminOurPicksComponent, AdminOurPicksTotalsComponent, AdminOurPicksPlayerSearchComponent],
  imports: [CommonModule, AdminRoutingModule, FblCoreModule, SharedModule, AngularMaterialModule],
  providers: [AdminLoggedGuard, AdminOurPicksLoadedGuard, AdminOurPicksResolver]
})
export class AdminModule {}
