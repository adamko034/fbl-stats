import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersGamesPlayedRoutingModule } from './players-games-played-routing.module';
import { PlayersGamesPlayedResolver } from './resolvers/players-games-played.resolver';
import { PlayersGamesPlayedComponent } from './views/players-games-played/players-games-played.component';

@NgModule({
  declarations: [PlayersGamesPlayedComponent],
  imports: [CommonModule, PlayersGamesPlayedRoutingModule, SharedModule, FlexLayoutModule],
  providers: [PlayersGamesPlayedResolver]
})
export class PlayersGamesPlayedModule {}
