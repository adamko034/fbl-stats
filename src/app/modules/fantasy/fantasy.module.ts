import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FantasyRoutingModule } from './fantasy-routing.module';
import { FantasyContentComponent } from './views/fantasy-content/fantasy-content.component';
import { FantasyNavigationComponent } from './views/fantasy-content/fantasy-navigation/fantasy-navigation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [FantasyContentComponent, FantasyNavigationComponent],
  imports: [CommonModule, FantasyRoutingModule, SharedModule, AngularMaterialModule]
})
export class FantasyModule {}
