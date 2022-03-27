import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesDifficultyRoutingModule } from './fixtures-difficulty-routing.module';
import { FixturesDifficultyTeamsLoaderFactory } from './logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixtureDifficultyColorsService } from './services/fixture-difficulty-colors.service';
import { FixturesDifficultyFiltersService } from './services/fixtures-difficulty-filters.service';
import { FixturesDifficultyFiltersComponent } from './view/fixtures-difficulty-filters/fixtures-difficulty-filters.component';
import { FixturesDifficultyFixturesComponent } from './view/fixtures-difficulty-fixtures/fixtures-difficulty-fixtures.component';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

@NgModule({
  declarations: [FixturesDifficultyFixturesComponent, FixturesDifficultyComponent, FixturesDifficultyFiltersComponent],
  imports: [CommonModule, FixturesDifficultyRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    FixtureDifficultyColorsService,
    FixturesDifficultyResolver,
    FixturesDifficultyFiltersService,
    FixturesDifficultyTeamsLoaderFactory
  ]
})
export class FixturesDifficultyModule {}
