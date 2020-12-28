import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/layout/content/content.component';

const routes: Routes = [
  { path: 'home', component: ContentComponent },
  {
    path: 'myteam',
    loadChildren: () => import('./modules/my-team/my-team.module').then((m) => m.MyTeamModule)
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
