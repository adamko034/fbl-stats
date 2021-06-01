import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersStatsRoutingModule } from './players-stats-routing.module';
import { PlayersStatsContentComponent } from './views/players-stats-content/players-stats-content.component';

@NgModule({
  declarations: [PlayersStatsContentComponent],
  imports: [CommonModule, PlayersStatsRoutingModule, SharedModule]
})
export class PlayersStatsModule {}
