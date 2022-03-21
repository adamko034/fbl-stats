import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesDifficultyFixturesTableComponent } from './components/fixtures-difficulty-fixtures-table/fixtures-difficulty-fixtures-table.component';
import { FixturesDifficultySortComponent } from './components/fixtures-difficulty-sort/fixtures-difficulty-sort.component';
import { FixturesDifficultyVenueFilterComponent } from './components/fixtures-difficulty-venue-filter/fixtures-difficulty-venue-filter.component';
import { FixturesDifficultyRoutingModule } from './fixtures-difficulty-routing.module';
import { FixturesByFormMatchdaysGuard } from './guards/fixtures-by-form-matchdays.guard';
import { FixturesDifficultyLoader } from './loaders/fixtures-difficulty.loader';
import { FixturesDifficultyTeamsLoaderFactory } from './logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyByFormResolver } from './resolvers/fixtures-difficulty-by-form.resolver';
import { FixturesDifficultyByRankResolver } from './resolvers/fixtures-difficulty-by-rank.resolver';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixtureDifficultyColorsService } from './services/fixture-difficulty-colors.service';
import { FixturesDifficultyFiltersService } from './services/fixtures-difficulty-filters.service';
import { FixturesDifficultyByFormComponent } from './view/fixtures-difficulty-by-form/fixtures-difficulty-by-form.component';
import { FixturesDifficultyByRankComponent } from './view/fixtures-difficulty-by-rank/fixtures-difficulty-by-rank.component';
import { FixturesDifficultyContentComponent } from './view/fixtures-difficulty-content/fixtures-difficulty-content.component';
import { FixturesDifficultyFiltersComponent } from './view/fixtures-difficulty-filters/fixtures-difficulty-filters.component';
import { FixturesDifficultyFixturesComponent } from './view/fixtures-difficulty-fixtures/fixtures-difficulty-fixtures.component';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

@NgModule({
  declarations: [
    FixturesDifficultyByFormComponent,
    FixturesDifficultyByRankComponent,
    FixturesDifficultyFixturesComponent,
    FixturesDifficultyVenueFilterComponent,
    FixturesDifficultySortComponent,
    FixturesDifficultyFixturesTableComponent,
    FixturesDifficultyContentComponent,
    FixturesDifficultyComponent,
    FixturesDifficultyFiltersComponent
  ],
  imports: [CommonModule, FixturesDifficultyRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    FixturesDifficultyLoader,
    FixturesDifficultyByRankResolver,
    FixturesDifficultyByFormResolver,
    FixtureDifficultyColorsService,
    FixturesByFormMatchdaysGuard,
    FixturesDifficultyResolver,
    FixturesDifficultyFiltersService,
    FixturesDifficultyTeamsLoaderFactory
  ]
})
export class FixturesDifficultyModule {}
