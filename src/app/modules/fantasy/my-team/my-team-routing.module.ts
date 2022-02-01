import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from '../../core/guards/fixtures-loaded.guard';
import { MyTeamLoadedGuard } from '../../core/guards/my-team-loaded.guard';
import { MyTeamContentComponent } from './views/my-team-content/my-team-content.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamContentComponent,
    canActivate: [FixturesLoadedGuard, MyTeamLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
