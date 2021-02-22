import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-our-picks-matchday-description',
  templateUrl: './our-picks-matchday-description.component.html',
  styleUrls: ['./our-picks-matchday-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksMatchdayDescriptionComponent implements OnInit {
  @Input() matchday: number;

  public iconsLegend: { icon: string; description: string }[] = [
    { icon: 'mustHave', description: 'must have player' },
    { icon: 'premium', description: 'premium pick - high cost player who can score big' },
    { icon: 'bargain', description: 'bargain pick - max price 8M' },
    { icon: 'differential', description: 'differential - max popularity 5%' }
  ];

  constructor() {}

  ngOnInit(): void {}
}