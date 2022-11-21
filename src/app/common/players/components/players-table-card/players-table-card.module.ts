import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
import { PositionSwitchModule } from 'src/app/common/components/filters/position-switch/position-switch.module';
import { CardModule } from 'src/app/common/components/ui/card/card.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { PlayerIconPredictionModule } from '../player-icon-prediction/player-icon-prediction.module';
import { PlayerNameWithAvailabilityModule } from '../player-name-with-availability/player-name-with-availability.module';
import { PlayersTableCardComponent } from './players-table-card.component';
import { PlayersTableCardPlayerConverter } from './services/players-table-card-player.converter';

@NgModule({
  declarations: [PlayersTableCardComponent],
  imports: [
    CommonModule,
    CardModule,
    PositionSwitchModule,
    FlexLayoutModule,
    PlayerNameWithAvailabilityModule,
    TeamLogoModule,
    PlayerIconPredictionModule,
    NgPipesModule,
    StickyModule
  ],
  exports: [PlayersTableCardComponent],
  providers: [PlayersTableCardPlayerConverter]
})
export class PlayersTableCardModule {}
