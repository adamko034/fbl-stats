import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { NavigationMenuModule } from 'src/app/common/components/ui/navigation-menu/navigation-menu.module';
import { TitleModule } from 'src/app/common/components/ui/title/title.module';
import { PlayersTableModule } from 'src/app/common/players/players-table/players-table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryPlayersRoutingModule } from './history-players-routing.module';
import { HistoryConverter } from './services/history-converter.service';
import { HistoryPlayersComponent } from './views/history-players.component';

@NgModule({
  declarations: [HistoryPlayersComponent],
  imports: [
    CommonModule,
    HistoryPlayersRoutingModule,
    // FblCoreModule,
    LegendModule,
    TitleModule,
    SharedModule,
    AngularMaterialModule,
    PlayersTableModule,
    NavigationMenuModule,
    //PositionSwitchModule,
    AdBannerModule
  ],
  providers: [HistoryConverter]
})
export class HistoryPlayersModule {}
