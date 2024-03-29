import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationMenuModule } from 'src/app/common/components/ui/navigation-menu/navigation-menu.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistorySeasonChildResolver } from './routing/history-season-child.resolver';
import { HistorySeasonLoadedGuard } from './routing/history-season-loaded.guard';
import { HistorySeasonResolver } from './routing/history-season.resolver';
import { HistoryContentComponent } from './views/history-content.component';

@NgModule({
  declarations: [HistoryContentComponent],
  imports: [CommonModule, HistoryRoutingModule, NavigationMenuModule, SharedModule],
  providers: [HistorySeasonLoadedGuard, HistorySeasonResolver, HistorySeasonChildResolver]
})
export class HistoryModule {}
