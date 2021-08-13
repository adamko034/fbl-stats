import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { ImageLazyLoadingDirective } from 'src/app/shared/directives/image-lazy-loading.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { AboutUsComponent } from './modules/about-us/views/about-us/about-us.component';
@NgModule({
  declarations: [AppComponent, ToastrComponent, ImageLazyLoadingDirective, SidenavComponent, AboutUsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
