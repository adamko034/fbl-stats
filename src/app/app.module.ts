import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersFilterMatchdaysComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-matchdays/players-filter-matchdays.component';
import { PlayersFilterMaxPriceComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-max-price/players-filter-max-price.component';
import { SelectTeamsDialogComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/select-teams-dialog/select-teams-dialog.component';
import { PlayersFiltersComponent } from 'src/app/layout/content/components/players-filters/players-filters.component';
import { PlayersTableContainerComponent } from 'src/app/layout/content/components/players-table-container/players-table-container.component';
import { ContentComponent } from 'src/app/layout/content/content.component';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { ExpandedPlayersService } from 'src/app/modules/core/players/services/expanded-players.service';
import { ImageLazyLoadingDirective } from 'src/app/shared/directives/image-lazy-loading.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { PlayersFilterHideUnavailableComponent } from './layout/content/components/players-filters/components/players-filter-hide-unavailable/players-filter-hide-unavailable.component';
import { PlayersFilterPopularityComponent } from './layout/content/components/players-filters/components/players-filter-popularity/players-filter-popularity.component';
import { PlayersFilterPositionComponent } from './layout/content/components/players-filters/components/players-filter-position/players-filter-position.component';
import { PlayersFilterShowOnlyReturningComponent } from './layout/content/components/players-filters/components/players-filter-show-only-returning/players-filter-show-only-returning.component';
import { SelectTeamsFromTableComponent } from './layout/content/components/players-filters/components/players-filter-teams/components/select-teams-from-table/select-teams-from-table.component';
import { SmartTeamsSelectionDialogComponent } from './layout/content/components/players-filters/components/players-filter-teams/components/smart-teams-selection-dialog/smart-teams-selection-dialog.component';
import { PlayersFilterTeamsComponent } from './layout/content/components/players-filters/components/players-filter-teams/players-filter-teams.component';
import { HeaderNavigationComponent } from './layout/header/components/header-navigation/header-navigation.component';
import { LastUdpatedComponent } from './layout/header/components/last-udpated/last-udpated.component';
import { NewUpdatesComponent } from './layout/header/components/new-updates/new-updates.component';
import { SidenavComponent } from './layout/header/components/sidenav/sidenav.component';
import { HeaderComponent } from './layout/header/header.component';
import { StartupLoadingComponent } from './layout/startup-loading/startup-loading.component';
import { ExpansionPanelComponent } from './shared/components/expansion-panel/expansion-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersFiltersComponent,
    PlayersTableContainerComponent,
    ContentComponent,
    PlayersFilterMaxPriceComponent,
    PlayersFilterPopularityComponent,
    PlayersFilterTeamsComponent,
    HeaderComponent,
    ToastrComponent,
    SelectTeamsDialogComponent,
    ExpansionPanelComponent,
    PlayersFilterHideUnavailableComponent,
    LastUdpatedComponent,
    LoadingComponent,
    NewUpdatesComponent,
    PlayersFiltersComponent,
    ImageLazyLoadingDirective,
    SmartTeamsSelectionDialogComponent,
    SelectTeamsFromTableComponent,
    StartupLoadingComponent,
    HeaderNavigationComponent,
    PlayersFilterPositionComponent,
    PlayersFilterShowOnlyReturningComponent,
    PlayersFilterMatchdaysComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgPipesModule,
    MomentModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    FblCoreModule,
    AngularMaterialModule
  ],
  providers: [ExpandedPlayersService, ScreenTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
