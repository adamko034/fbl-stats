import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/layout/about-us/about-us.component';
import { ContentComponent } from 'src/app/layout/content/content.component';

const routes: Routes = [
  { path: 'home', component: ContentComponent },
  {
    path: 'myteam',
    loadChildren: () => import('./modules/my-team/my-team.module').then((m) => m.MyTeamModule)
  },
  { path: 'about', component: AboutUsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
