import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayLatestGuard } from '../core/guards/matchday-latest.guard';
import { MatchdayTipsLinksLoadedGuard } from '../core/matchday-tips/links/guards/matchday-tips-links-loaded.guard';
import { MatchdayTipsLinksResolver } from '../core/matchday-tips/links/resolvers/matchday-tips-links.resolver';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminMatchdayTipsLinksComponent } from './matchday-tips/links/views/admin-matchday-tips-links/admin-matchday-tips-links.component';
import { AdminMatchdayTipsOurPicksLoadedGuard } from './matchday-tips/our-picks/guards/admin-matchday-tips-our-picks-loaded.guard';
import { AdminMatchdayTipsOurPicksResolver } from './matchday-tips/our-picks/resolvers/admin-matchday-tips-our-picks.resolver';
import { AdminMatchdayTipsOurPicksComponent } from './matchday-tips/our-picks/views/admin-matchday-tips-our-picks/admin-matchday-tips-our-picks.component';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
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
        path: 'tips',
        children: [
          { path: '', redirectTo: 'links', pathMatch: 'full' },
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
                canActivate: [MatchdayLatestGuard, AdminMatchdayTipsOurPicksLoadedGuard],
                resolve: { adminOurPicks: AdminMatchdayTipsOurPicksResolver },
                component: AdminMatchdayTipsOurPicksComponent
              }
            ]
          },
          {
            path: 'links',
            canActivate: [MatchdayTipsLinksLoadedGuard],
            resolve: { tips: MatchdayTipsLinksResolver },
            component: AdminMatchdayTipsLinksComponent
          }
        ]
      },
      {
        path: 'bestgks',
        loadChildren: () => import('./bestgks/admin-bestgks.module').then((m) => m.AdminBestgksModule)
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
