import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerNameLinkComponent } from './player-name-link.component';

@NgModule({
  declarations: [PlayerNameLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [PlayerNameLinkComponent]
})
export class PlayerNameLinkModule {}
