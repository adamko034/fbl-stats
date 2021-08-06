import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { FantasyTipLink } from '../../models/fantasy-tip-link.model';
import { FantasyTips } from '../../models/fantasy-tips.model';

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
  public categories$: Observable<SwitchItem[]>;
  public selectedCategory: string = 'all';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.tips),
        untilDestroyed(this)
      )
      .subscribe((tips) => {
        this.tips = tips;
        this.filteredLinks = [...tips.links];
      });
    this.categories$ = this.route.data.pipe(
      map((data) => data.tips),
      map((tips: FantasyTips) => {
        if (!tips || !tips.links) {
          return [];
        }

        const categories = ['all'];
        tips.links.forEach((link) => {
          link.categories.forEach((category) => {
            if (!categories.includes(category.toLowerCase())) {
              categories.push(category.toLowerCase());
            }
          });
        });

        return categories.sort().map((category) => ({
          value: category,
          description: `${category[0].toUpperCase()}${category.slice(1)}`
        }));
      })
    );
  }

  public onCategoryChange(newCategory: string): void {
    this.selectedCategory = newCategory;
    this.filteredLinks =
      newCategory === 'all'
        ? [...this.tips.links]
        : this.tips.links.filter((link) => link.categories.includes(newCategory.toLowerCase()));
  }
}
