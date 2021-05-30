import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fixturesDifficultyVariables } from '../../static/fixtures-difficulty-variables.static';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-venue-filter',
  templateUrl: './fixtures-difficulty-venue-filter.component.html',
  styleUrls: ['./fixtures-difficulty-venue-filter.component.scss']
})
export class FixturesDifficultyVenueFilterComponent implements OnInit {
  @Output() includeVenueChange = new EventEmitter<boolean>();

  public isVenueCalculation$: Observable<boolean>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.isVenueCalculation$ = this.route.queryParams.pipe(
      map((params) =>
        !!params.includeVenue ? params.includeVenue === 'true' : fixturesDifficultyVariables.defaultVenueCalculation
      )
    );
  }

  public onToggleCheckbox(change: MatCheckboxChange) {
    this.includeVenueChange.emit(change.checked);
  }
}
