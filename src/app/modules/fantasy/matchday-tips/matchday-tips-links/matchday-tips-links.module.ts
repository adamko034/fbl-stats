import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsLinksRoutingModule } from './matchday-tips-links-routing.module';
import { MatchdayTipsLinksComponent } from './views/matchday-tips-links.component';

@NgModule({
  declarations: [MatchdayTipsLinksComponent],
  imports: [CommonModule, MatchdayTipsLinksRoutingModule, SharedModule, AngularMaterialModule]
})
export class MatchdayTipsLinksModule {}
