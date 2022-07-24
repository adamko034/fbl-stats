import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyTeamLoadedGuard } from './my-team-loaded.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MyTeamLoadedGuard]
})
export class MyTeamGuardsModule {}
