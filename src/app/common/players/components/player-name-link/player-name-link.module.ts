import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PlayerNameLinkComponent } from './player-name-link.component';

@NgModule({
  declarations: [PlayerNameLinkComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  exports: [PlayerNameLinkComponent]
})
export class PlayerNameLinkModule {}
