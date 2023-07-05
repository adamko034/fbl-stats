import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageTitleGuard } from './page-title/page-title.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PageTitleGuard]
})
export class CommonGuardsModule {}
