import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/layout/about-us/about-us.component';
import { CoreDataLoadedGuard as CoreDataLoadedGuard } from 'src/app/resolvers/core-data-loaded.guard';
import { AdminLoginComponent } from './modules/core/admin/views/admin-login/admin-login.component';

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
      { path: 'fantasy', loadChildren: () => import('./modules/players/players.module').then((m) => m.PlayersModule) },
      {
        path: 'lineups',
        loadChildren: () => import('./modules/lineups/predicted-lineups.module').then((m) => m.PredictedLineupsModule)
      },
      { path: 'about', component: AboutUsComponent },
      { path: 'bundesliga', loadChildren: () => import('./modules/teams/teams.module').then((m) => m.TeamsModule) },
      { path: 'admin', component: AdminLoginComponent }
    ]
  },

  { path: '**', redirectTo: 'fantasy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
