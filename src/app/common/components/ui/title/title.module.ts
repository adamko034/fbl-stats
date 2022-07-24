import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentWhiteBlockModule } from '../content-white-block/content-white-block.module';
import { TitleComponent } from './title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [CommonModule, ContentWhiteBlockModule],
  exports: [TitleComponent]
})
export class TitleModule {}
