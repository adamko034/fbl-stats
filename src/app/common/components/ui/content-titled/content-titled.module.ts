import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { ContentTitledComponent } from './content-titled.component';

@NgModule({
  declarations: [ContentTitledComponent],
  imports: [CommonModule, StickyModule],
  exports: [ContentTitledComponent]
})
export class ContentTitledModule {}
