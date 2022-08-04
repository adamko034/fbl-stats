import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularEmojisModule } from 'angular-emojis';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsRoutingModule } from './matchday-tips-routing.module';
import { MatchdayTipsComponent } from './views/matchday-tips/matchday-tips.component';

@NgModule({
  declarations: [MatchdayTipsComponent],
  imports: [CommonModule, MatchdayTipsRoutingModule, SharedModule, AngularEmojisModule, PipesModule]
})
export class MatchdayTipsModule {}
