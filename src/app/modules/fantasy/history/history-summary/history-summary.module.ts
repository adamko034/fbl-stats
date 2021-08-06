import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistorySummaryRoutingModule } from './history-summary-routing.module';
import { HistorySummaryResolver } from './resolvers/history-summary.resolver';
import { HistorySummaryLineupComponent } from './views/history-summary/history-summary-lineup/history-summary-lineup.component';
import { HistorySummaryComponent } from './views/history-summary/history-summary.component';

@NgModule({
  declarations: [HistorySummaryComponent, HistorySummaryLineupComponent],
  imports: [CommonModule, HistorySummaryRoutingModule, SharedModule, AngularMaterialModule],
  providers: [HistorySummaryResolver]
})
export class HistorySummaryModule {}