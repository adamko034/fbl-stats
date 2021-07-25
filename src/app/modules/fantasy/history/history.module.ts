import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistorySeasonLoadedGuard } from './guards/history-season-loaded.guard';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryContentComponent } from './views/history-content/history-content.component';

@NgModule({
  declarations: [HistoryContentComponent],
  imports: [CommonModule, HistoryRoutingModule, SharedModule],
  providers: [HistorySeasonLoadedGuard]
})
export class HistoryModule {}
