import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BundesligaTableModule } from 'src/app/common/teams/bundesliga-table/bundesliga-table.module';
import { HistoryBundesligaRoutingModule } from './history-bundesliga-routing.module';
import { HistoryBundesligaTeamsConverter } from './logic/history-bundesliga-teams.converter';
import { HistoryBundesligaComponent } from './views/history-bundesliga.component';

@NgModule({
  declarations: [HistoryBundesligaComponent],
  imports: [CommonModule, HistoryBundesligaRoutingModule, BundesligaTableModule],
  providers: [HistoryBundesligaTeamsConverter]
})
export class HistoryBundesligaModule {}
