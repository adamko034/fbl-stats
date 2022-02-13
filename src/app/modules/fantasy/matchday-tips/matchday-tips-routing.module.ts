import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayTipsComponent } from './views/matchday-tips/matchday-tips.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bestteam',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MatchdayTipsComponent,
    children: [
      {
        path: 'bestteam',
        loadChildren: () =>
          import('./matchday-tips-top-team/matchday-tips-top-team.module').then((m) => m.MatchdayTipsTopTeamModule)
      },
      {
        path: 'links',
        loadChildren: () =>
          import('./matchday-tips-links/matchday-tips-links.module').then((m) => m.MatchdayTipsLinksModule)
      },
      {
        path: 'ourpicks',
        loadChildren: () =>
          import('./matchday-tips-our-picks/matchday-tips-our-picks.module').then((m) => m.OurPicksModule)
      },
      {
        path: 'unlimitedtransfers',
        loadChildren: () =>
          import('./matchday-tips-unlimited-transfers/matchday-tips-unlimited-transfers.module').then(
            (m) => m.MatchdayTipsUnlimitedTransfersModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchdayTipsRoutingModule {}
