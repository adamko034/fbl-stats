import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersGamesPlayedRoutingModule } from './players-games-played-routing.module';
import { PlayersGamesPlayedComponent } from './views/players-games-played/players-games-played.component';


@NgModule({
  declarations: [PlayersGamesPlayedComponent],
  imports: [
    CommonModule,
    PlayersGamesPlayedRoutingModule
  ]
})
export class PlayersGamesPlayedModule { }
