import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdBanner } from './ad-banner.model';
import { AdBannerBuilder } from './ad-bunner.builder';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBannerComponent implements AfterViewInit {
  @Input() set slot(
    value: 'vertical' | 'horizontal' | 'horizontal2' | 'multiplex' | 'multiplexVertical1' | 'square' | 'square2'
  ) {
    if (value === 'horizontal') {
      this.adBanner = AdBannerBuilder.horizontal().build();
      return;
    } else if (value === 'horizontal2') {
      this.adBanner = AdBannerBuilder.horizontal2().build();
      return;
    } else if (value === 'multiplex') {
      this.adBanner = AdBannerBuilder.multiplex1().build();
      return;
    } else if (value === 'multiplexVertical1') {
      this.adBanner = AdBannerBuilder.multiplexVertical1().build();
      return;
    } else if (value === 'square') {
      this.adBanner = AdBannerBuilder.square().build();
      return;
    } else if (value === 'square2') {
      this.adBanner = AdBannerBuilder.square2().build();
      return;
    } else if (value === 'vertical') {
      this.adBanner = AdBannerBuilder.vertical().build();
      return;
    }

    console.error(value + ' is not know as ad banner type');
  }

  @Input() timeout = 0;

  public adBanner: AdBanner;
  public showAd = environment.adsense.show;
  public clientId = environment.adsense.adClient;

  public isTest = !environment.production;

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          overlays: { bottom: true }
        });
      } catch (e) {
        console.error(e);
      }
    }, this.timeout);
  }
}
