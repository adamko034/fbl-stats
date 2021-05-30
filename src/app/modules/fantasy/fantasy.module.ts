import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FantasyRoutingModule } from './fantasy-routing.module';
import { FantasyContentComponent } from './views/fantasy-content/fantasy-content.component';

@NgModule({
  declarations: [FantasyContentComponent],
  imports: [CommonModule, FantasyRoutingModule, SharedModule]
})
export class FantasyModule {}
