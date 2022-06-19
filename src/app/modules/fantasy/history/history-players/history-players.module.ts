import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { TitleModule } from 'src/app/common/components/ui/title/title.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryPlayersRoutingModule } from './history-players-routing.module';
import { HistoryPlayersResolver } from './resolvers/history-players.resolver';
import { HistoryPlayersFiltersService } from './services/history-players-fitlers.service';
import { HistoryPlayersFiltersComponent } from './views/history-players/history-players-filters/history-players-filters.component';
import { HistoryPlayersTableComponent } from './views/history-players/history-players-table/history-players-table.component';
import { HistoryPlayersComponent } from './views/history-players/history-players.component';

@NgModule({
  declarations: [HistoryPlayersComponent, HistoryPlayersFiltersComponent, HistoryPlayersTableComponent],
  imports: [
    CommonModule,
    HistoryPlayersRoutingModule,
    FblCoreModule,
    LegendModule,
    TitleModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [HistoryPlayersResolver, HistoryPlayersFiltersService]
})
export class HistoryPlayersModule {}
