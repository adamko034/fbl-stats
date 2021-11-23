import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';
import { MatchdaysTipsLinks } from 'src/app/store/matchday-tips/links/models/matchday-tips-links.model';

@UntilDestroy()
@Component({
  selector: 'app-matchday-tips-links',
  templateUrl: './matchday-tips-links.component.html',
  styleUrls: ['./matchday-tips-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsLinksComponent implements OnInit {
  public tips: MatchdaysTipsLinks;
  public filteredLinks: MatchdayTipsLink[];
  public categories: SwitchItem[];
  public selectedCategory: string = 'all';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.tips),
        untilDestroyed(this)
      )
      .subscribe((tips: MatchdaysTipsLinks) => {
        this.tips = tips;
        this.categories = this.getCategoriesSwitchItems(tips.categories);
        this.filteredLinks = [...tips.links];
      });
  }

  public onCategoryChange(newCategory: string): void {
    this.selectedCategory = newCategory;
    this.filteredLinks =
      newCategory === 'all'
        ? [...this.tips.links]
        : this.tips.links.filter((link) => link.categories.includes(newCategory.toLowerCase()));
  }

  public openInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  private getCategoriesSwitchItems(categories: string[]): SwitchItem[] {
    return categories.sort().map((category) => ({
      value: category,
      description: `${category[0].toUpperCase()}${category.slice(1)}`
    }));
  }
}
