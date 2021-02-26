import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersSearchComponent } from 'src/app/modules/core/players/components/players-display/components/players-search/players-search.component';
import { PlayersListComponent } from 'src/app/modules/core/players/components/players-list/players-list.component';
import { SelectMoreMatchdaysDialogComponent } from 'src/app/modules/core/players/components/players-select-matchdays/components/select-more-form-dialog/select-more-matchdays-dialog.component';
import { PlayersSelectMatchdaysComponent } from 'src/app/modules/core/players/components/players-select-matchdays/players-select-matchdays.component';
import { PlayersTableComponent } from 'src/app/modules/core/players/components/players-table/players-table.component';
import { PredictionSourceComponent } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/components/player-next-match-predictions/components/prediction-source/prediction-source.component';
import { PlayerNextMatchPredictionsComponent } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/components/player-next-match-predictions/player-next-match-predictions.component';
import { PlayerNextMatchTeamsComponent } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/components/player-next-match-teams/player-next-match-teams.component';
import { PlayerNextMatchDetailsComponent } from 'src/app/modules/core/players/components/shared/player-details/components/player-next-match-details/player-next-match-details.component';
import { PlayerSchedulesComponent } from 'src/app/modules/core/players/components/shared/player-details/components/player-schedules/player-schedules.component';
import { PlayerDetailsComponent } from 'src/app/modules/core/players/components/shared/player-details/player-details.component';
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
import { OurPickIconComponent } from '../../shared/components/our-pick-icon/our-pick-icon.component';
import { PlayersViewSwitchComponent } from './players/components/players-display/components/players-view-switch/players-view-switch.component';
import { PlayersDisplayComponent } from './players/components/players-display/players-display.component';

@NgModule({
  declarations: [
    PlayersListComponent,
    PlayersTableComponent,
    PlayerDetailsComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayerTileComponent,
    PlayerTileNoRecordsComponent,
    PlayerNextMatchDetailsComponent,
    PlayerSchedulesComponent,
    PlayerNextMatchPredictionsComponent,
    PlayerNextMatchTeamsComponent,
    PredictionSourceComponent,
    PlayerTileFantasyDataComponent,
    PlayerTileFantasyPointsComponent,
    PlayerTileNameComponent,
    PlayerTileNextGameComponent,
    PlayersSelectMatchdaysComponent,
    SelectMoreMatchdaysDialogComponent,
    PlayersViewSwitchComponent,
    PlayersDisplayComponent,
    PlayersSearchComponent
  ],
  imports: [CommonModule, SharedModule, AngularMaterialModule, NgxChartsModule],
  exports: [
    PlayersListComponent,
    PlayersTableComponent,
    PlayerDetailsComponent,
    PlayerNextGameComponent,
    PlayerReturningComponent,
    PlayerSuspensionRiskComponent,
    PlayerTileComponent,
    PlayerTileNoRecordsComponent,
    PlayerNextMatchDetailsComponent,
    PlayerSchedulesComponent,
    PlayerNextMatchPredictionsComponent,
    PlayerNextMatchTeamsComponent,
    PredictionSourceComponent,
    PlayerTileFantasyDataComponent,
    PlayerTileFantasyPointsComponent,
    PlayerTileNameComponent,
    PlayerTileNextGameComponent,
    PlayersSelectMatchdaysComponent,
    PlayersViewSwitchComponent,
    PlayersSearchComponent
  ]
})
export class FblCoreModule {}
