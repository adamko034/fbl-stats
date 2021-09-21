import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatsPointsComponent } from './views/players-stats-points/players-stats-points.component';

const routes: Routes = [{ path: '', component: PlayersStatsPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatsPointsRoutingModule {}
