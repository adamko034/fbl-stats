import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchdayLatestGuard } from '../core/guards/matchday-latest.guard';
import { OurPicksResolver } from '../core/our-picks/resolvers/our-picks.resolver';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminOurPicksLoadedGuard } from './guard/admin-our-picks-loaded.guard';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminOurPicksComponent } from './views/admin-our-picks/admin-our-picks.component';
import { AdminComponent } from './views/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'our-picks',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AdminLoggedGuard],
    component: AdminComponent,
    children: [
      {
        path: 'our-picks',
        children: [
          {
            path: '',
            redirectTo: 'latest',
            pathMatch: 'full'
          },
          {
            path: ':matchday',
            canActivate: [MatchdayLatestGuard, AdminOurPicksLoadedGuard],
            resolve: { players: OurPicksResolver },
            component: AdminOurPicksComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
