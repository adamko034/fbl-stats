import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdBannerCreatorService } from './logic/ad-banner-creator.service';
import { AdBanner } from './logic/ad-banner.model';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBannerComponent implements OnInit {
  @Input() type: 'square' | 'horizontal' | 'vertical' | 'multiplexVertical';
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() autoFormat = true;

  public adBanner: AdBanner;
  public style: any;
  public slotIndex = 0;
  public showAd = environment.adsense.show;

  constructor(private changeDetection: ChangeDetectorRef, private adBannerCreator: AdBannerCreatorService) {}

  public ngOnInit(): void {
    this.adBanner = this.adBannerCreator.create(this.type, this.autoFormat, this.height, this.width);

    setInterval(
      () => {
        this.slotIndex = Math.floor(Math.random() * this.adBanner.slots.length);
        this.changeDetection.detectChanges();
      },
      environment.production ? 12000 : 200000000000000
    );
  }
}
