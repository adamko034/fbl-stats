import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsefulLinksComponent } from './views/useful-links/useful-links.component';

const routes: Routes = [
  {
    path: '',
    title: 'FBL Useful Links',
    component: UsefulLinksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsefulLinksRoutingModule {}
