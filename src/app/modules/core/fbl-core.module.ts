import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersSearchComponent } from 'src/app/modules/core/players/components/players-display/players-search/players-search.component';
import { PlayersListComponent } from 'src/app/modules/core/players/components/players-list/players-list.component';
import { PlayersSelectMatchdaysComponent } from 'src/app/modules/core/players/components/players-select-matchdays/players-select-matchdays.component';
import { PlayersTableComponent } from 'src/app/modules/core/players/components/players-table/players-table.component';
import { PlayerNextGameComponent } from 'src/app/modules/core/players/components/shared/player-next-game/player-next-game.component';
import { PlayerReturningComponent } from 'src/app/modules/core/players/components/shared/player-returning/player-returning.component';
import { PlayerSuspensionRiskComponent } from 'src/app/modules/core/players/components/shared/player-suspension-risk/player-suspension-risk.component';
import { PlayerTileNoRecordsComponent } from 'src/app/modules/core/players/components/shared/player-tile-no-records/player-tile-no-records.component';
import { PlayerTileFantasyDataComponent } from 'src/app/modules/core/players/components/shared/player-tile/components/player-tile-fantasy-data/player-tile-fantasy-data.component';
import { PlayerTileFantasyPointsComponent } from 'src/app/modules/core/players/components/shared/player-tile/components/player-tile-fantasy-points/player-tile-fantasy-points.component';
import { PlayerTileNameComponent } from 'src/app/modules/core/players/components/shared/player-tile/components/player-tile-name/player-tile-name.component';
import { PlayerTileNextGameComponent } from 'src/app/modules/core/players/components/shared/player-tile/components/player-tile-next-game/player-tile-next-game.component';
import { PlayerTileComponent } from 'src/app/modules/core/players/components/shared/player-tile/player-tile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersDisplayComponent } from './players/components/players-display/players-display.component';
import { PlayersViewSwitchComponent } from './players/components/players-display/players-view-switch/players-view-switch.component';
import { SelectMoreMatchdaysDialogComponent } from './players/components/players-select-matchdays/select-more-form-dialog/select-more-matchdays-dialog.component';
import { PlayersTableAddOurPickComponent } from './players/components/players-table/players-table-add-our-pick/players-table-add-our-pick.component';
import { PlayersPickerComponent } from './players/picker/components/players-picker/players-picker.component';

@NgModule({
  declarations: [
    PlayersListComponent,
    PlayersTableComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayerTileComponent,
    PlayerTileNoRecordsComponent,
    PlayerTileFantasyDataComponent,
    PlayerTileFantasyPointsComponent,
    PlayerTileNameComponent,
    PlayerTileNextGameComponent,
    PlayersSelectMatchdaysComponent,
    SelectMoreMatchdaysDialogComponent,
    PlayersViewSwitchComponent,
    PlayersDisplayComponent,
    PlayersSearchComponent,
    PlayersTableAddOurPickComponent,
    PlayersPickerComponent
  ],
  imports: [CommonModule, SharedModule, AngularMaterialModule, RouterModule],
  exports: [
    PlayersListComponent,
    PlayersTableComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayerTileComponent,
    PlayerTileNoRecordsComponent,
    PlayerTileFantasyDataComponent,
    PlayerTileFantasyPointsComponent,
    PlayerTileNameComponent,
    PlayerTileNextGameComponent,
    PlayersSelectMatchdaysComponent,
    PlayersViewSwitchComponent,
    PlayersSearchComponent,
    PlayersPickerComponent
  ]
})
export class FblCoreModule {}
