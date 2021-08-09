import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TipsRoutingModule } from './tips-routing.module';
import { FantasyTipsComponent } from './views/fantasy-tips/fantasy-tips.component';

@NgModule({
  declarations: [FantasyTipsComponent],
  imports: [CommonModule, TipsRoutingModule, SharedModule, AngularMaterialModule]
})
export class TipsModule {}
