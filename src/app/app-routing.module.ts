import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/layout/about-us/about-us.component';
import { ContentComponent } from 'src/app/layout/content/content.component';
import { CoreDataLoadedGuard as CoreDataLoadedGuard } from 'src/app/resolvers/core-data-loaded.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [CoreDataLoadedGuard],
    children: [
      { path: 'home', component: ContentComponent },
      {
        path: 'myteam',
        loadChildren: () => import('./modules/my-team/my-team.module').then((m) => m.MyTeamModule)
      },
      { path: 'about', component: AboutUsComponent },
      { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then((m) => m.TeamsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
