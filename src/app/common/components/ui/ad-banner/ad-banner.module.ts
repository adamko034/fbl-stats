import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerComponent } from './ad-banner.component';

@NgModule({
  declarations: [AdBannerComponent],
  imports: [CommonModule],
  exports: [AdBannerComponent]
})
export class AdBannerModule {}
