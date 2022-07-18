import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TitleModule } from 'src/app/common/components/ui/title/title.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistorySummaryRoutingModule } from './history-summary-routing.module';
import { HistorySummaryLineupComponent } from './views/history-summary-lineup/history-summary-lineup.component';
import { HistorySummaryComponent } from './views/history-summary.component';

@NgModule({
  declarations: [HistorySummaryComponent, HistorySummaryLineupComponent],
  imports: [CommonModule, HistorySummaryRoutingModule, SharedModule, AngularMaterialModule, TitleModule]
})
export class HistorySummaryModule {}
