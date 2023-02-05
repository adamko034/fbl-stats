import { Injectable } from '@angular/core';
import { AdBannerSlots } from './ad-banner-slots';
import { AdBanner } from './ad-banner.model';
import { AdBannerBuilder } from './ad-bunner.builder';

@Injectable()
export class AdBannerCreatorService {
  public create(
    type: 'square' | 'horizontal' | 'vertical' | 'multiplexVertical',
    autoFormat: boolean,
    height: number | undefined,
    width: number | undefined
  ): AdBanner {
    let builder: AdBannerBuilder;
    let format = autoFormat ? 'auto' : '';

    switch (type) {
      case 'square': {
        builder = AdBannerBuilder.slots(AdBannerSlots.squares);
        break;
      }
      case 'multiplexVertical': {
        builder = AdBannerBuilder.slots(AdBannerSlots.multiplexVerticals);
        format = 'autorelaxed';
        break;
      }
      case 'vertical': {
        builder = AdBannerBuilder.slots(AdBannerSlots.verticals);
        break;
      }
      default: {
        builder = AdBannerBuilder.slots(AdBannerSlots.horizontals);
        break;
      }
    }

    return builder
      .format(format)
      .withAutoFormat(autoFormat)
      .width(width)
      .height(height)
      .fullWidthResponsive(autoFormat ? true : null)
      .build();
  }
}
