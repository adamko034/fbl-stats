import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixturesRoutingModule } from './fixtures-routing.module';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';


@NgModule({
  declarations: [BundesligaFixturesComponent],
  imports: [
    CommonModule,
    FixturesRoutingModule
  ]
})
export class FixturesModule { }
