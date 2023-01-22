import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { BundesligaFixturesResolver } from './resolvers/bundesliga-fixtures.resolver';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard],
    title: 'FBL Bundesliga Fixtures',
    resolve: { matchdays: BundesligaFixturesResolver },
    component: BundesligaFixturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesRoutingModule {}
