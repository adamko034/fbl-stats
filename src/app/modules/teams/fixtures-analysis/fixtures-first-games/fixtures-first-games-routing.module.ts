import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from 'src/app/modules/core/guards/fixtures-loaded.guard';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard],
    component: FixturesFirstGamesComponent,
    resolve: { state: FixturesFirstGamesResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesFirstGamesRoutingModule {}
