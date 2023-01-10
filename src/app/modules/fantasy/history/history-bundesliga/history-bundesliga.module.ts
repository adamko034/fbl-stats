import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationMenuModule } from 'src/app/common/components/ui/navigation-menu/navigation-menu.module';
import { BundesligaTableModule } from 'src/app/common/teams/bundesliga-table/bundesliga-table.module';
import { HistoryBundesligaRoutingModule } from './history-bundesliga-routing.module';
import { HistoryBundesligaTeamsConverter } from './logic/history-bundesliga-teams.converter';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

@NgModule({
  declarations: [HistoryBundesligaComponent],
  imports: [CommonModule, HistoryBundesligaRoutingModule, BundesligaTableModule, NavigationMenuModule],
  providers: [HistoryBundesligaTeamsConverter]
})
export class HistoryBundesligaModule {}
