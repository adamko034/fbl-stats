import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        resolve: { matchday: LeadersTop100Resolver },
        component: LeadersMatchdayComponent
      },
      {
        path: 'top500',
        resolve: { matchday: LeadersTop500Resolver },
        component: LeadersMatchdayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadersRoutingModule {}
