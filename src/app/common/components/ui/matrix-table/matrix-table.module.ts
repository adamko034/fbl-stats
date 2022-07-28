import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { MatrixTableComponent } from './matrix-table.component';

@NgModule({
  declarations: [MatrixTableComponent],
  imports: [CommonModule, StickyModule, NgPipesModule, TeamLogoModule, PlayerNameLinkModule],
  exports: [MatrixTableComponent]
})
export class MatrixTableModule {}
