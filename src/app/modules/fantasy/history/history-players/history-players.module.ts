import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryPlayersLoadedGuard } from './guards/history-players-loaded.guard';
import { HistoryPlayersRoutingModule } from './history-players-routing.module';
import { HistoryPlayersResolver } from './resolvers/history-players.resolver';
import { HistoryPlayersFiltersService } from './services/history-players-fitlers.service';
import { HistoryPlayersFiltersComponent } from './views/history-players/history-players-filters/history-players-filters.component';
import { HistoryPlayersTableComponent } from './views/history-players/history-players-table/history-players-table.component';
import { HistoryPlayersComponent } from './views/history-players/history-players.component';

@NgModule({
  declarations: [HistoryPlayersComponent, HistoryPlayersFiltersComponent, HistoryPlayersTableComponent],
  imports: [CommonModule, HistoryPlayersRoutingModule, FblCoreModule, SharedModule, AngularMaterialModule],
  providers: [HistoryPlayersResolver, HistoryPlayersFiltersService, HistoryPlayersLoadedGuard]
})
export class HistoryPlayersModule {}
