import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersContentComponent } from './views/players-content/players-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {}
