import { AdBanner } from './ad-banner.model';

export class AdBannerBuilder {
  private _adBanner: AdBanner;

  private constructor(slots: string[]) {
    this._adBanner = {
      slots,
      format: 'auto',
      autoFormat: true,
      fullWidthResponsive: true,
      width: undefined,
      height: undefined
    };
  }

  public static slots(slots: string[]): AdBannerBuilder {
    return new AdBannerBuilder(slots);
  }

  public width(width: number | undefined): AdBannerBuilder {
    this._adBanner.width = width;
    return this;
  }

  public height(height: number | undefined): AdBannerBuilder {
    this._adBanner.height = height;
    return this;
  }

  // public static multiplex1(): AdBannerBuilder {
  //   return this.instance(AdBannerSlots.multiplex).withFormat('autorelaxed');
  // }

  // public static square_200_200(): AdBannerBuilder {
  //   return this.instance(AdBannerSlots.square)
  //     .withStyle({ display: 'inline-block', 'width.px': 200, 'height.px': 200 })
  //     .withFormat('');
  // }

  // public static square2_300_100(): AdBannerBuilder {
  //   return this.instance(AdBannerSlots.square2)
  //     .withStyle({ display: 'inline-block', 'width.px': 300, 'height.px': 100 })
  //     .withFormat('');
  // }

  public format(format: string): AdBannerBuilder {
    this._adBanner.format = format;
    return this;
  }

  public withAutoFormat(autoFormat: boolean): AdBannerBuilder {
    this._adBanner.autoFormat = autoFormat;
    return this;
  }

  public fullWidthResponsive(value: boolean | null): AdBannerBuilder {
    this._adBanner.fullWidthResponsive = value;
    return this;
  }

  public build(): AdBanner {
    return this._adBanner;
  }
}
