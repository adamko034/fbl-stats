import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamServicesModule } from '../../teams/services/team-services.module';
import { FixtureDifficultyColorByRankDirective } from './fixture-difficulty-color-by-rank.directive';

@NgModule({
  declarations: [FixtureDifficultyColorByRankDirective],
  imports: [CommonModule, TeamServicesModule],
  exports: [FixtureDifficultyColorByRankDirective]
})
export class FixtureDifficultyColorByRankModule {}
