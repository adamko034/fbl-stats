import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { FantasyTipLink } from 'src/app/store/tips/models/fantasy-tip-link.model';
import { FantasyTips } from 'src/app/store/tips/models/fantasy-tips.model';

@UntilDestroy()
@Component({
  selector: 'app-fantasy-tips',
  templateUrl: './fantasy-tips.component.html',
  styleUrls: ['./fantasy-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyTipsComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Matchday tips', labelMobile: 'Matchday tips', order: 1, routerLink: '' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  public tips: FantasyTips;
  public filteredLinks: FantasyTipLink[];
  public categories: SwitchItem[];
  public selectedCategory: string = 'all';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.tips),
        untilDestroyed(this)
      )
      .subscribe((tips: FantasyTips) => {
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
