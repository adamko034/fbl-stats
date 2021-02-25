import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchdayLatestGuard } from '../core/guards/matchday-latest.guard';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { OurPicksContentComponent } from './our-picks-content/our-picks-content.component';
import { OurPicksPlayersResolver } from '../core/our-picks/resolvers/our-picks-players.resolver';
import { OurPicksMatchdayComponent } from './views/our-picks-matchday/our-picks-matchday.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'latest',
    pathMatch: 'full'
  },
  {
    path: '',
    component: OurPicksContentComponent,
    children: [
      {
        path: ':matchday',
        canActivate: [MatchdayLatestGuard, OurPicksLoadedGuard],
        component: OurPicksMatchdayComponent,
        resolve: { players: OurPicksPlayersResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurPicksRoutingModule {}
