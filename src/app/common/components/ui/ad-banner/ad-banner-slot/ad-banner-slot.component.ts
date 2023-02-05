import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdBanner } from '../logic/ad-banner.model';

@Component({
  selector: 'app-ad-banner-slot',
  templateUrl: './ad-banner-slot.component.html',
  styleUrls: ['./ad-banner-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBannerSlotComponent implements OnInit, AfterViewInit {
  @Input() slot: string;
  @Input() adBanner: AdBanner;

  public clientId = environment.adsense.adClient;
  public isTest = !environment.production;
  public style: any;

  public ngOnInit(): void {
    this.style = { display: this.adBanner.autoFormat ? 'block' : 'inline-block' };
    if (!this.adBanner.autoFormat) {
      this.style['height.px'] = this.adBanner.height;
      this.style['width.px'] = this.adBanner.width;
    }
  }

  public ngAfterViewInit(): void {
    try {
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
        overlays: { bottom: true }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
