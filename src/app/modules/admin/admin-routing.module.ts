import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayLatestGuard } from '../core/guards/matchday-latest.guard';
import { MatchdayTipsLinksLoadedGuard } from '../core/tips/guards/matchday-tips-links-loaded.guard';
import { MatchdayTipsLinksResolver } from '../core/tips/resolvers/matchday-tips-links.resolver';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminOurPicksLoadedGuard } from './guard/admin-our-picks-loaded.guard';
import { AdminOurPicksResolver } from './resolvers/admin-our-picks.resolver';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminOurPicksComponent } from './views/admin-our-picks/admin-our-picks.component';
import { AdminTipsComponent } from './views/admin-tips/admin-tips.component';
import { AdminComponent } from './views/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tips',
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
            resolve: { adminOurPicks: AdminOurPicksResolver },
            component: AdminOurPicksComponent
          }
        ]
      },
      {
        path: 'tips',
        canActivate: [MatchdayTipsLinksLoadedGuard],
        resolve: { tips: MatchdayTipsLinksResolver },
        component: AdminTipsComponent
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
