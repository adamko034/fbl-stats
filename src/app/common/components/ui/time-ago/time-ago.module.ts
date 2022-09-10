import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { TimeAgoComponent } from './time-ago.component';

@NgModule({
  declarations: [TimeAgoComponent],
  imports: [CommonModule, PipesModule, NgPipesModule],
  exports: [TimeAgoComponent]
})
export class TimeAgoModule {}
