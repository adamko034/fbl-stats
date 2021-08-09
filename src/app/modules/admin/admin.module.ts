import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../core/fbl-core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminOurPicksLoadedGuard } from './guard/admin-our-picks-loaded.guard';
import { AdminOurPicksLoader } from './our-picks/loaders/admin-our-picks.loader';
import { AdminOurPicksResolver } from './resolvers/admin-our-picks.resolver';
import { AdminFantasyTipsService } from './tips/admin-fantasy-tips.service';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminOurPicksPlayerSearchComponent } from './views/admin-our-picks/admin-our-picks-player-search/admin-our-picks-player-search.component';
import { AdminOurPicksTotalsComponent } from './views/admin-our-picks/admin-our-picks-totals/admin-our-picks-totals.component';
import { AdminOurPicksComponent } from './views/admin-our-picks/admin-our-picks.component';
import { AdminNewTipComponent } from './views/admin-tips/admin-new-tip/admin-new-tip.component';
import { AdminTipsComponent } from './views/admin-tips/admin-tips.component';
import { AdminComponent } from './views/admin/admin.component';
@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminComponent,
    AdminOurPicksComponent,
    AdminOurPicksTotalsComponent,
    AdminOurPicksPlayerSearchComponent,
    AdminTipsComponent,
    AdminNewTipComponent
  ],
  imports: [CommonModule, AdminRoutingModule, FblCoreModule, SharedModule, AngularMaterialModule],
  providers: [
    AdminLoggedGuard,
    AdminOurPicksLoadedGuard,
    AdminOurPicksResolver,
    AdminOurPicksLoader,
    AdminFantasyTipsService
  ]
})
export class AdminModule {}
