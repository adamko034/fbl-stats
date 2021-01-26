import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { schedulesVariables } from 'src/app/modules/teams/views/teams-schedules/static/schedules-variables.static';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-schedules-include-venue-filter',
  templateUrl: './schedules-include-venue-filter.component.html',
  styleUrls: ['./schedules-include-venue-filter.component.scss']
})
export class SchedulesIncludeVenueFilterComponent implements OnInit {
  @Output() includeVenueChange = new EventEmitter<boolean>();

  public isVenueCalculation$: Observable<boolean>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.isVenueCalculation$ = this.route.queryParams.pipe(
      map((params) =>
        !!params.includeVenue ? params.includeVenue === 'true' : schedulesVariables.defaultVenueCalculation
      )
    );
  }

  public onToggleCheckbox(change: MatCheckboxChange) {
    this.includeVenueChange.emit(change.checked);
  }
}
