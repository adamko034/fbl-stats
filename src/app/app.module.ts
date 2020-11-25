import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';
import { ToastrModule } from 'ngx-toastr';
import { PlayersCountComponent } from 'src/app/layout/content/components/players-display-settings/components/players-count/players-count.component';
import { PlayersSearchComponent } from 'src/app/layout/content/components/players-display-settings/components/players-search/players-search.component';
import { PlayersDisplaySettingsComponent } from 'src/app/layout/content/components/players-display-settings/players-display-settings.component';
import { PlayersFilterMaxPriceComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-max-price/players-filter-max-price.component';
import { PlayersSelectFormComponent } from 'src/app/layout/content/components/players-filters/components/players-select-form/players-select-form.component';
import { PlayersFiltersComponent } from 'src/app/layout/content/components/players-filters/players-filters.component';
import { PlayerSchedulesComponent } from 'src/app/layout/content/components/players-table-container/components/shared/player-details/components/player-schedules/player-schedules.component';
import { PlayersTableContainerComponent } from 'src/app/layout/content/components/players-table-container/players-table-container.component';
import { ContentComponent } from 'src/app/layout/content/content.component';
import { TeamLogoSourceDirective } from 'src/app/shared/components/team-logo/directives/team-logo-source.directive';
import { TeamLogoStyleDirective } from 'src/app/shared/components/team-logo/directives/team-logo-style.directive';
import { ImageLazyLoadingDirective } from 'src/app/shared/directives/image-lazy-loading/image-lazy-loading.directive';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { PlayersViewSwitchComponent } from './layout/content/components/players-display-settings/components/players-view-switch/players-view-switch.component';
import { PlayersFilterHideUnavailableComponent } from './layout/content/components/players-filters/components/players-filter-hide-unavailable/players-filter-hide-unavailable.component';
import { PlayersFilterPopularityComponent } from './layout/content/components/players-filters/components/players-filter-popularity/players-filter-popularity.component';
import { PlayersFilterTeamsComponent } from './layout/content/components/players-filters/components/players-filter-teams/players-filter-teams.component';
import { SelectTeamsDialogComponent } from './layout/content/components/players-filters/components/players-filter-teams/select-teams-dialog/select-teams-dialog.component';
import { PlayersListComponent } from './layout/content/components/players-table-container/components/players-list/players-list.component';
import { PlayersTableComponent } from './layout/content/components/players-table-container/components/players-table/players-table.component';
import { PlayersTilesComponent } from './layout/content/components/players-table-container/components/players-tiles/players-tiles.component';
import { PlayerNextMatchDetailsComponent } from './layout/content/components/players-table-container/components/shared/player-details/components/player-next-match-details/player-next-match-details.component';
import { PlayerDetailsComponent } from './layout/content/components/players-table-container/components/shared/player-details/player-details.component';
import { PlayerNextGameComponent } from './layout/content/components/players-table-container/components/shared/player-next-game/player-next-game.component';
import { PlayerTileNoRecordsComponent } from './layout/content/components/players-table-container/components/shared/player-tile-no-records/player-tile-no-records.component';
import { PlayerTileFantasyDataComponent } from './layout/content/components/players-table-container/components/shared/player-tile/components/player-tile-fantasy-data/player-tile-fantasy-data.component';
import { PlayerTileFantasyPointsComponent } from './layout/content/components/players-table-container/components/shared/player-tile/components/player-tile-fantasy-points/player-tile-fantasy-points.component';
import { PlayerTileNameComponent } from './layout/content/components/players-table-container/components/shared/player-tile/components/player-tile-name/player-tile-name.component';
import { PlayerTileNextGameComponent } from './layout/content/components/players-table-container/components/shared/player-tile/components/player-tile-next-game/player-tile-next-game.component';
import { PlayerTileComponent } from './layout/content/components/players-table-container/components/shared/player-tile/player-tile.component';
import { SelectPositionComponent } from './layout/content/components/select-position/select-position.component';
import { LastUdpatedComponent } from './layout/header/components/last-udpated/last-udpated.component';
import { NewUpdatesComponent } from './layout/header/components/new-updates/new-updates.component';
import { HeaderComponent } from './layout/header/header.component';
import { ExpansionPanelComponent } from './shared/components/expansion-panel/expansion-panel.component';
import { FormFieldComponent } from './shared/components/form-field/form-field.component';
import { SwitchComponent } from './shared/components/switch/switch.component';
import { TeamLogoComponent } from './shared/components/team-logo/team-logo.component';
import { TimelineComponent } from './shared/components/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersFiltersComponent,
    PlayersTableContainerComponent,
    ContentComponent,
    PlayersFilterMaxPriceComponent,
    PlayersFilterPopularityComponent,
    PlayersFilterTeamsComponent,
    SwitchComponent,
    PlayersSelectFormComponent,
    PlayersTableComponent,
    HeaderComponent,
    ToastrComponent,
    SelectPositionComponent,
    SelectTeamsDialogComponent,
    PlayersSearchComponent,
    PlayersDisplaySettingsComponent,
    ExpansionPanelComponent,
    PlayersFilterHideUnavailableComponent,
    PlayersTableComponent,
    FormFieldComponent,
    PlayersCountComponent,
    PlayersListComponent,
    PlayersViewSwitchComponent,
    PlayersTilesComponent,
    PlayerTileComponent,
    PlayerTileNoRecordsComponent,
    LastUdpatedComponent,
    LoadingComponent,
    NewUpdatesComponent,
    PlayersFiltersComponent,
    TimelineComponent,
    PlayerDetailsComponent,
    PlayerSchedulesComponent,
    TeamLogoComponent,
    PlayerNextGameComponent,
    PlayerNextMatchDetailsComponent,
    PlayerTileNameComponent,
    PlayerTileFantasyDataComponent,
    PlayerTileNextGameComponent,
    PlayerTileFantasyPointsComponent,
    ImageLazyLoadingDirective,
    TeamLogoSourceDirective,
    TeamLogoStyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgPipesModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
