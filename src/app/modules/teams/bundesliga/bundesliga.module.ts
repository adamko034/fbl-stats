import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BundesligaRoutingModule } from './bundesliga-routing.module';
import { BundesligaContentComponent } from './views/bundesliga-content/bundesliga-content.component';

@NgModule({
  declarations: [BundesligaContentComponent],
  imports: [CommonModule, BundesligaRoutingModule, SharedModule]
})
export class BundesligaModule {}
