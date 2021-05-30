import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesDifficultyFixturesTableComponent } from './components/fixtures-difficulty-fixtures-table/fixtures-difficulty-fixtures-table.component';
import { FixturesDifficultyFixturesComponent } from './components/fixtures-difficulty-fixtures/fixtures-difficulty-fixtures.component';
import { FixturesDifficultySortComponent } from './components/fixtures-difficulty-sort/fixtures-difficulty-sort.component';
import { FixturesDifficultyVenueFilterComponent } from './components/fixtures-difficulty-venue-filter/fixtures-difficulty-venue-filter.component';
import { FixturesDifficultyRoutingModule } from './fixtures-difficulty-routing.module';
import { FixturesDifficultyLoader } from './loaders/fixtures-difficulty.loader';
import { FixturesDifficultyByFormResolver } from './resolvers/fixtures-difficulty-by-form.resolver';
import { FixturesDifficultyByRankResolver } from './resolvers/fixtures-difficulty-by-rank.resolver';
import { FixtureDifficultyColorsService } from './services/fixture-difficulty-colors.service';
import { FixturesDifficultyByFormComponent } from './view/fixtures-difficulty-by-form/fixtures-difficulty-by-form.component';
import { FixturesDifficultyByRankComponent } from './view/fixtures-difficulty-by-rank/fixtures-difficulty-by-rank.component';
import { FixturesDifficultyContentComponent } from './view/fixtures-difficulty-content/fixtures-difficulty-content.component';

@NgModule({
  declarations: [
    FixturesDifficultyByFormComponent,
    FixturesDifficultyByRankComponent,
    FixturesDifficultyFixturesComponent,
    FixturesDifficultyVenueFilterComponent,
    FixturesDifficultySortComponent,
    FixturesDifficultyFixturesTableComponent,
    FixturesDifficultyContentComponent
  ],
  imports: [CommonModule, FixturesDifficultyRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    FixturesDifficultyLoader,
    FixturesDifficultyByRankResolver,
    FixturesDifficultyByFormResolver,
    FixtureDifficultyColorsService
  ]
})
export class FixturesDifficultyModule {}
