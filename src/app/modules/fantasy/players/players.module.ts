import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersContentComponent } from './views/players-content/players-content.component';

@NgModule({
  declarations: [PlayersContentComponent],
  imports: [CommonModule, PlayersRoutingModule, SharedModule]
})
export class PlayersModule {}
