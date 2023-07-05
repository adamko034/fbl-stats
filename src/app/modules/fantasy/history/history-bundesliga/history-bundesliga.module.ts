import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { NavigationMenuModule } from 'src/app/common/components/ui/navigation-menu/navigation-menu.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { BundesligaTableModule } from 'src/app/common/teams/bundesliga-table/bundesliga-table.module';
import { HistoryBundesligaRoutingModule } from './history-bundesliga-routing.module';
import { HistoryBundesligaTeamsConverter } from './logic/history-bundesliga-teams.converter';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

@NgModule({
  declarations: [HistoryBundesligaComponent],
  imports: [
    CommonModule,
    HistoryBundesligaRoutingModule,
    BundesligaTableModule,
    NavigationMenuModule,
    AdBannerModule,
    CommonGuardsModule
  ],
  providers: [HistoryBundesligaTeamsConverter]
})
export class HistoryBundesligaModule {}
