import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersSearchComponent } from 'src/app/modules/core/players/components/players-display/players-search/players-search.component';
import { PlayersSelectMatchdaysComponent } from 'src/app/modules/core/players/components/players-select-matchdays/players-select-matchdays.component';
import { PlayersTableComponent } from 'src/app/modules/core/players/components/players-table/players-table.component';
import { PlayerNextGameComponent } from 'src/app/modules/core/players/components/shared/player-next-game/player-next-game.component';
import { PlayerReturningComponent } from 'src/app/modules/core/players/components/shared/player-returning/player-returning.component';
import { PlayerSuspensionRiskComponent } from 'src/app/modules/core/players/components/shared/player-suspension-risk/player-suspension-risk.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersDisplayComponent } from './players/components/players-display/players-display.component';
import { SelectMoreMatchdaysDialogComponent } from './players/components/players-select-matchdays/select-more-form-dialog/select-more-matchdays-dialog.component';
import { PlayersTableAddOurPickComponent } from './players/components/players-table/players-table-add-our-pick/players-table-add-our-pick.component';
import { PlayersPickerComponent } from './players/picker/components/players-picker/players-picker.component';

@NgModule({
  declarations: [
    PlayersTableComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayersSelectMatchdaysComponent,
    SelectMoreMatchdaysDialogComponent,
    PlayersDisplayComponent,
    PlayersSearchComponent,
    PlayersTableAddOurPickComponent,
    PlayersPickerComponent
  ],
  imports: [CommonModule, SharedModule, AngularMaterialModule, RouterModule],
  exports: [
    PlayersTableComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayersSelectMatchdaysComponent,
    PlayersSearchComponent,
    PlayersPickerComponent
  ]
})
export class FblCoreModule {}
