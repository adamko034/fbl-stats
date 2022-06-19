import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { ContentTitledComponent } from './content-titled.component';

@NgModule({
  declarations: [ContentTitledComponent],
  imports: [CommonModule, FlexLayoutModule, StickyModule],
  exports: [ContentTitledComponent]
})
export class ContentTitledModule {}
