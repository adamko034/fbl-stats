import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/layout/about-us/about-us.component';
import { CoreDataLoadedGuard as CoreDataLoadedGuard } from 'src/app/resolvers/core-data-loaded.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fantasy',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [CoreDataLoadedGuard],
    children: [
      { path: 'fantasy', loadChildren: () => import('./modules/fantasy/fantasy.module').then((m) => m.FantasyModule) },
      {
        path: 'lineups',
        loadChildren: () => import('./modules/lineups/predicted-lineups.module').then((m) => m.PredictedLineupsModule)
      },
      { path: 'about', component: AboutUsComponent },
      { path: 'bundesliga', loadChildren: () => import('./modules/teams/teams.module').then((m) => m.TeamsModule) },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) }
    ]
  },

  { path: '**', redirectTo: 'fantasy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
