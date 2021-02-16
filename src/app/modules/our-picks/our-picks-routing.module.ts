import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurPicksLatestGuard } from './guards/our-picks-latest.guard';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { OurPicksContentComponent } from './our-picks-content/our-picks-content.component';
import { OurPicksPlayersResolver } from './resolvers/our-picks-players.resolver';
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
        canActivate: [OurPicksLatestGuard, OurPicksLoadedGuard],
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
