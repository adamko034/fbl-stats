import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersOverallContentComponent } from './views/players-content/players-overall-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersOverallContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersOverallRoutingModule {}
