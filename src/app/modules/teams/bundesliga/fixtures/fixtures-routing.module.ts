import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { BundesligaFixtureDetailsResolver } from './resolvers/bundesliga-fixture-details.resolver';
import { BundesligaFixturesResolver } from './resolvers/bundesliga-fixtures.resolver';
import { BundesligaFixtureDetailsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details.component';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard],
    title: 'FBL Bundesliga Fixtures',
    resolve: { matchdays: BundesligaFixturesResolver },
    component: BundesligaFixturesComponent
  },
  {
    path: ':matchday',
    children: [
      {
        path: ':home',
        children: [
          {
            resolve: { state: BundesligaFixtureDetailsResolver },
            path: ':away',
            component: BundesligaFixtureDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesRoutingModule {}
