import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailsResolver } from './resolvers/player-details.resolver';
import { PlayerDetailsContentComponent } from './view/player-details-content/player-details-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerDetailsContentComponent,
    resolve: { player: PlayerDetailsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerDetailsRoutingModule {}
