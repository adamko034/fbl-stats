import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
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
import { IfScreenModule } from './common/directives/if-screen/if-screen.module';
import { PipesModule } from './common/pipes/pipes.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { AboutUsComponent } from './modules/about-us/views/about-us/about-us.component';
@NgModule({
  declarations: [
    AppComponent,
    ToastrComponent,
    ImageLazyLoadingDirective,
    SidenavComponent,
    AboutUsComponent,
    HeaderComponent
  ],
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
    FblCoreModule,
    AngularMaterialModule,
    IfScreenModule,
    MomentModule,
    PipesModule
  ],
  providers: [ScreenTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
