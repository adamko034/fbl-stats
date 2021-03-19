import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurPicksType } from 'src/app/modules/core/our-picks/models/our-picks-type.enum';

@Component({
  selector: 'app-our-picks-matchday-description',
  templateUrl: './our-picks-matchday-description.component.html',
  styleUrls: ['./our-picks-matchday-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksMatchdayDescriptionComponent implements OnInit {
  public matchday$: Observable<number>;

  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'must have player' },
    { icon: 'premium', description: 'premium pick - high cost player who can score big' },
    { icon: 'bargain', description: 'bargain pick - max price 8M' },
    { icon: 'differential', description: 'differential - max popularity 5%' },
    { icon: OurPicksType.SURPRISING, description: 'surprising pick, player you may not think about' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.matchday$ = this.route.data.pipe(map((data) => data.ourPicks?.matchday));
  }
}
