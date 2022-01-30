import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamLoadedGuard } from '../../core/guards/my-team-loaded.guard';
import { MyTeamContentComponent } from './views/my-team-content/my-team-content.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamContentComponent,
    canActivate: [MyTeamLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
