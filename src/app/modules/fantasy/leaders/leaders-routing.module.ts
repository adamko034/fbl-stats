import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersTop100Resolver } from './resolvers/leaders-top100.resolver';
import { LeadersTop500Resolver } from './resolvers/leaders-top500.resolver';
import { LeadersContentComponent } from './views/leaders-content/leaders-content.component';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top500',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [LeadersLoadedGuard],
    component: LeadersContentComponent,
    children: [
      {
        path: 'top100',
        title: 'Leaders Top 100',
        resolve: { matchday: LeadersTop100Resolver },
        component: LeadersMatchdayComponent,
        canActivate: [PageTitleGuard],
        data: { pageTitle: 'Leaders: Top 100' }
      },
      {
        path: 'top500',
        title: 'FBL Leaders Top 500',
        resolve: { matchday: LeadersTop500Resolver },
        component: LeadersMatchdayComponent,
        canActivate: [PageTitleGuard],
        data: { pageTitle: 'Leaders: Top 500' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadersRoutingModule {}
