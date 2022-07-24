import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamLoadedGuard } from 'src/app/common/my-team/routing/guards/my-team-loaded.guard';
import { PropertiesResolver } from 'src/app/common/routing/resolvers/properties-resolver/properties.resolver';
import { FixturesLoadedGuard } from '../../core/guards/fixtures-loaded.guard';
import { MyTeamContentComponent } from './views/my-team-content.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamContentComponent,
    resolve: { properties: PropertiesResolver },
    canActivate: [FixturesLoadedGuard, MyTeamLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
