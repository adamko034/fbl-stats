import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadersLoadedGuard } from './guards/leaders-loaded.guard';
import { LeadersMatchdayLatestGuard } from './guards/leaders-matchdays-latest.guard';
import { LeadersContentComponent } from './views/leaders-content/leaders-content.component';
import { LeadersMatchdayResolver } from './resolvers/leaders-matchday.resolver';
import { LeadersMatchdaysNumbersResolver } from './resolvers/leaders-matchdays-numbers.resolver';
import { LeadersMatchdayComponent } from './views/leaders-matchday/leaders-matchday.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'latest',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [LeadersLoadedGuard],
    resolve: { matchdaysNumbers: LeadersMatchdaysNumbersResolver },
    component: LeadersContentComponent,
    children: [
      {
        path: ':matchday',
        canActivate: [LeadersMatchdayLatestGuard],
        resolve: { matchday: LeadersMatchdayResolver },
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
