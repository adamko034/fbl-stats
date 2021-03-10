import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamContentComponent } from './views/my-team-content/my-team-content.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
