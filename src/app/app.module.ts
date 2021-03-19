import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { ImageLazyLoadingDirective } from 'src/app/shared/directives/image-lazy-loading.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HeaderNavigationComponent } from './layout/header/components/header-navigation/header-navigation.component';
import { LastUdpatedComponent } from './layout/header/components/last-udpated/last-udpated.component';
import { NewUpdatesComponent } from './layout/header/components/new-updates/new-updates.component';
import { SidenavComponent } from './layout/header/components/sidenav/sidenav.component';
import { HeaderComponent } from './layout/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToastrComponent,
    LastUdpatedComponent,
    LoadingComponent,
    NewUpdatesComponent,
    ImageLazyLoadingDirective,
    HeaderNavigationComponent,
    SidenavComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MomentModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    FblCoreModule,
    AngularMaterialModule
  ],
  providers: [ScreenTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
