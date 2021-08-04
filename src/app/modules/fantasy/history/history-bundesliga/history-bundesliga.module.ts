import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryBundesligaLoadedGuard } from './guards/history-bundesliga-loaded.guard';
import { HistoryBundesligaRoutingModule } from './history-bundesliga-routing.module';
import { HistoryBundesligaResolver } from './resolvers/history-bundesliga.resolver';
import { HistoryBundesligaComponent } from './views/history-bundesliga/history-bundesliga.component';

@NgModule({
  declarations: [HistoryBundesligaComponent],
  imports: [CommonModule, HistoryBundesligaRoutingModule, SharedModule, AngularMaterialModule],
  providers: [HistoryBundesligaLoadedGuard, HistoryBundesligaResolver]
})
export class HistoryBundesligaModule {}
