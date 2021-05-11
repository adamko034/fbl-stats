import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDataLoadedGuard as CoreDataLoadedGuard } from 'src/app/modules/core/resolvers/core-data-loaded.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [CoreDataLoadedGuard],
    children: [
      {
        path: 'players',
        loadChildren: () => import('./modules/fantasy/fantasy.module').then((m) => m.FantasyModule)
      },
      {
        path: 'lineups',
        loadChildren: () => import('./modules/lineups/predicted-lineups.module').then((m) => m.PredictedLineupsModule)
      },
      { path: 'about', loadChildren: () => import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule) },
      { path: 'bundesliga', loadChildren: () => import('./modules/teams/teams.module').then((m) => m.TeamsModule) },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) }
    ]
  }

  // { path: '**', redirectTo: 'fantasy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
