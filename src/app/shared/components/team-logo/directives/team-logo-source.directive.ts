import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appTeamLogoSource]' })
export class TeamLogoSourceDirective implements OnInit {
  @Input('appTeamLogoSource') teamShort: string;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    this.el.nativeElement.setAttribute('src', `/assets/logos/${this.teamShort}.png`);
    this.el.nativeElement.setAttribute('alt', this.teamShort);
  }
}
