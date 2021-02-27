import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { OurPicksDisplaySettings } from '../../models/our-picks-display-settings.model';
import { OurPicksDisplay } from '../../models/our-picks-display.enum';
import { OurPicksDisplaySettingsService } from '../../services/our-picks-display-settings.service';

@Component({
  selector: 'app-our-picks-display-settings',
  templateUrl: './our-picks-display-settings.component.html',
  styleUrls: ['./our-picks-display-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksDisplaySettingsComponent implements OnInit {
  public settings$: Observable<OurPicksDisplaySettings>;
  public screenLarge$: Observable<boolean>;

  public displayItems: SwitchItem[] = [
    { value: OurPicksDisplay.LIST, matIcon: 'reorder' },
    { value: OurPicksDisplay.TILES, matIcon: 'grid_view' }
  ];

  constructor(private service: OurPicksDisplaySettingsService, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.settings$ = this.service.selectAll();
    this.screenLarge$ = this.screenSizeService.onResize().pipe(map((size) => size > ScreenSize.MD));
  }

  public onDisplayChange(newDisplay: OurPicksDisplay): void {
    this.service.updateDisplay(newDisplay);
  }
}
