import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { MatchdayTipsTopTeamFilters } from '../../models/matchday-tips-top-team-filters.model';
import { MatchdayTipsTopTeamType } from '../../models/matchday-tips-top-team-type.enum';

@Component({
  selector: 'app-matchday-tips-top-team-filters',
  templateUrl: './matchday-tips-top-team-filters.component.html',
  styleUrls: ['./matchday-tips-top-team-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsTopTeamFiltersComponent implements OnInit {
  @Input() filters: MatchdayTipsTopTeamFilters;
  @Input() maxPrice: number;
  @Input() lastMatchday: number;

  public types: SwitchItem[];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.types = [
      { value: MatchdayTipsTopTeamType.OVERALL, description: 'Overall', descriptionMobile: 'Overall' },
      { value: MatchdayTipsTopTeamType.LEG_FIST, description: '1st leg', descriptionMobile: '1st leg' },
      {
        value: MatchdayTipsTopTeamType.LEG_SECOND,
        description: '2nd leg',
        descriptionMobile: '2nd leg',
        hidden: this.lastMatchday <= 17
      },
      { value: MatchdayTipsTopTeamType.HOME, description: 'Home', descriptionMobile: 'Home' },
      { value: MatchdayTipsTopTeamType.AWAY, description: 'Away', descriptionMobile: 'Away' },
      {
        value: MatchdayTipsTopTeamType.LAST_2,
        description: 'Last 2',
        descriptionMobile: 'Last 2',
        hidden: this.lastMatchday < 2
      },
      {
        value: MatchdayTipsTopTeamType.LAST_4,
        description: 'Last 4',
        descriptionMobile: 'Last 4',
        hidden: this.lastMatchday < 4
      },
      {
        value: MatchdayTipsTopTeamType.LAST_6,
        description: 'Last 6',
        descriptionMobile: 'Last 6',
        hidden: this.lastMatchday < 6
      }
    ];
  }

  public onPriceChange(newPrice: number): void {
    this.router.navigate([], { queryParams: { price: newPrice }, queryParamsHandling: 'merge' });
  }

  public onPopularityChange(newPopularity: number): void {
    this.router.navigate([], { queryParams: { popularity: newPopularity }, queryParamsHandling: 'merge' });
  }

  public onTop500PopularityChange(newPopularity: number): void {
    this.router.navigate([], { queryParams: { top500: newPopularity }, queryParamsHandling: 'merge' });
  }

  public onTypeChange(newType: string): void {
    this.router.navigate([], { queryParams: { type: newType }, queryParamsHandling: 'merge' });
  }
}
