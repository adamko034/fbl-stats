import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FixtureDifficultyService } from '../../teams/services/fixture-difficulty.service';

@Directive({
  selector: '[appFixtureDifficultyColorByRank]'
})
export class FixtureDifficultyColorByRankDirective implements OnInit {
  @Input('appFixtureDifficultyColorByRank') rank: number;

  constructor(private element: ElementRef, private fixtureDifficultyService: FixtureDifficultyService) {}

  public ngOnInit(): void {
    const cssClass = this.fixtureDifficultyService.cssClassByRank(this.rank);
    this.element.nativeElement.classList.add(cssClass);
  }
}
