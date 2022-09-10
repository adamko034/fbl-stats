import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { GoalsIconsComponent } from './goals-icons.component';

@NgModule({
  declarations: [GoalsIconsComponent],
  imports: [CommonModule, MatTooltipModule, ScaleModule],
  exports: [GoalsIconsComponent]
})
export class GoalsIconsModule {}
