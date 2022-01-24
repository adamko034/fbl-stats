import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersCompareBestGksGuard } from '../../core/guards/players-compare-bestgks.guard';
import { AdminBestGksResolver } from './routing/admin-best-gks.resolver';
import { AdminBestGksComponent } from './views/admin-best-gks.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBestGksComponent,
    canActivate: [PlayersCompareBestGksGuard],
    resolve: { state: AdminBestGksResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBestgksRoutingModule {}
