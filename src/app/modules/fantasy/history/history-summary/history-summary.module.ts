import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MaxPopularitySliderModule } from 'src/app/common/components/filters/max-popularity-slider/max-popularity-slider.module';
import { MaxPriceSliderModule } from 'src/app/common/components/filters/max-price-slider/max-price-slider.module';
import { FormFieldModule } from 'src/app/common/components/ui/form-field/form-field.module';
import { NavigationMenuModule } from 'src/app/common/components/ui/navigation-menu/navigation-menu.module';
import { TitleModule } from 'src/app/common/components/ui/title/title.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistorySummaryRoutingModule } from './history-summary-routing.module';
import { HistorySummaryLineupComponent } from './views/history-summary-lineup/history-summary-lineup.component';
import { HistorySummaryComponent } from './views/history-summary.component';

@NgModule({
  declarations: [HistorySummaryComponent, HistorySummaryLineupComponent],
  imports: [
    CommonModule,
    HistorySummaryRoutingModule,
    SharedModule,
    AngularMaterialModule,
    TitleModule,
    TeamLogoModule,
    FormFieldModule,
    MaxPriceSliderModule,
    NavigationMenuModule,
    MaxPopularitySliderModule
  ]
})
export class HistorySummaryModule {}
