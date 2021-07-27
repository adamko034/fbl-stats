import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsefulLinksRoutingModule } from './useful-links-routing.module';
import { UsefulLinksComponent } from './views/useful-links/useful-links.component';

@NgModule({
  declarations: [UsefulLinksComponent],
  imports: [CommonModule, UsefulLinksRoutingModule, SharedModule, AngularMaterialModule]
})
export class UsefulLinksModule {}
