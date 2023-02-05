import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerComponent } from './ad-banner.component';
import { AdBannerCreatorService } from './logic/ad-banner-creator.service';
import { AdBannerSlotComponent } from './ad-banner-slot/ad-banner-slot.component';

@NgModule({
  declarations: [AdBannerComponent, AdBannerSlotComponent],
  imports: [CommonModule],
  exports: [AdBannerComponent],
  providers: [AdBannerCreatorService]
})
export class AdBannerModule {}
