import { AdBannerSlots } from './ad-banner-slots';
import { AdBanner } from './ad-banner.model';

export class AdBannerBuilder {
  private _adBunner: AdBanner;

  private constructor(slot: string) {
    this._adBunner = { slot, format: 'auto', fullWidthResponsive: true };
  }

  public static instance(slot: string): AdBannerBuilder {
    return new AdBannerBuilder(slot);
  }

  public static horizontal(): AdBannerBuilder {
    return this.instance(AdBannerSlots.horizontal);
  }

  public static horizontal2(): AdBannerBuilder {
    return this.instance(AdBannerSlots.horizontal2);
  }

  public static multiplex1(): AdBannerBuilder {
    return this.instance(AdBannerSlots.multiplex).withFormat('autorelaxed');
  }

  public static multiplexVertical1(): AdBannerBuilder {
    return this.instance(AdBannerSlots.multiplexVertical1).withFormat('autorelaxed');
  }

  public static square(): AdBannerBuilder {
    return this.instance(AdBannerSlots.square);
  }

  public static square2(): AdBannerBuilder {
    return this.instance(AdBannerSlots.square2);
  }

  public static vertical(): AdBannerBuilder {
    return this.instance(AdBannerSlots.vertical);
  }

  public withFormat(format: string): AdBannerBuilder {
    this._adBunner.format = format;
    return this;
  }

  public withFullWidthResponsive(value: boolean): AdBannerBuilder {
    this._adBunner.fullWidthResponsive = value;
    return this;
  }

  public build(): AdBanner {
    return this._adBunner;
  }
}
