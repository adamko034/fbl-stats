import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamLogoComponent } from './team-logo.component';

@NgModule({
  declarations: [TeamLogoComponent],
  imports: [CommonModule],
  exports: [TeamLogoComponent]
})
export class TeamLogoModule {}
