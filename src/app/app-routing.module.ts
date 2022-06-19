import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDataLoadedGuard } from 'src/app/modules/core/resolvers/core-data-loaded.guard';

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
      {
        path: 'fantasy',
        loadChildren: () => import('./modules/fantasy/fantasy.module').then((m) => m.FantasyModule)
      },

      { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then((m) => m.TeamsModule) },
      { path: 'about', loadChildren: () => import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule) },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
