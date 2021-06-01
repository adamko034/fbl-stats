import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdayLatestGuard } from '../../core/guards/matchday-latest.guard';
import { OurPicksResolver } from '../../core/our-picks/resolvers/our-picks.resolver';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { OurPicksMatchdaysResolver } from './resolvers/our-picks-matchdays.resolver';
import { OurPicksContentComponent } from './views/our-picks-content/our-picks-content.component';
import { OurPicksMatchdayComponent } from './views/our-picks-matchday/our-picks-matchday.component';

const routes: Routes = [
  {
    path: '',
    component: OurPicksContentComponent,
    resolve: { matchdays: OurPicksMatchdaysResolver },
    children: [
      {
        path: '',
        redirectTo: 'latest',
        pathMatch: 'full'
      },
      {
        path: '',
        children: [
          {
            path: ':matchday',
            canActivate: [MatchdayLatestGuard, OurPicksLoadedGuard],
            component: OurPicksMatchdayComponent,
            resolve: { ourPicks: OurPicksResolver }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurPicksRoutingModule {}
