import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsComponent } from './views/matchday-tips/matchday-tips.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ourpicks',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MatchdayTipsComponent,
    children: [
      {
        path: 'links',
        loadChildren: () =>
          import('./matchday-tips-links/matchday-tips-links.module').then((m) => m.MatchdayTipsLinksModule)
      },
      {
        path: 'ourpicks',
        loadChildren: () =>
          import('./matchday-tips-our-picks/matchday-tips-our-picks.module').then((m) => m.OurPicksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsRoutingModule {}
