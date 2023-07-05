import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { BundesligaFixtureDetailsResolver } from './resolvers/bundesliga-fixture-details.resolver';
import { BundesligaFixturesResolver } from './resolvers/bundesliga-fixtures.resolver';
import { BundesligaFixtureDetailsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details.component';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard, PageTitleGuard],
    title: 'Bundesliga: Fixtures',
    resolve: { matchdays: BundesligaFixturesResolver },
    component: BundesligaFixturesComponent,
    data: { pageTitle: 'Bundesliga: Fixtures' }
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
            component: BundesligaFixtureDetailsComponent,
            canActivate: [PageTitleGuard],
            data: { pageTitle: 'Bundesliga: Fixture Details' }
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
