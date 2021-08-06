import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesRoutingModule } from './fixtures-routing.module';
import { BundesligaFixturesResolver } from './resolvers/bundesliga-fixtures.resolver';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';

@NgModule({
  declarations: [BundesligaFixturesComponent],
  imports: [CommonModule, FixturesRoutingModule, AngularMaterialModule, SharedModule],
  providers: [BundesligaFixturesResolver]
})
export class FixturesModule {}