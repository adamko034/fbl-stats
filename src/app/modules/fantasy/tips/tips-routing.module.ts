import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyTipsLoadedGuard } from './guards/fantasy-tips-loaded.guard';
import { FantasyTipsResolver } from './resolvers/fantasy-tips.resolver';
import { FantasyTipsComponent } from './views/fantasy-tips/fantasy-tips.component';

const routes: Routes = [
  {
    path: '',
    resolve: { tips: FantasyTipsResolver },
    canActivate: [FantasyTipsLoadedGuard],
    component: FantasyTipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsRoutingModule {}
