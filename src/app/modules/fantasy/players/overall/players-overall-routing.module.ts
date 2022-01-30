import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamLoadedGuard } from 'src/app/modules/core/guards/my-team-loaded.guard';
import { PlayersOverallContentComponent } from './views/players-content/players-overall-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersOverallContentComponent,
    canActivate: [MyTeamLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersOverallRoutingModule {}
