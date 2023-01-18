import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';

@Directive({
  selector: '[appIfScreen]'
})
export class IfScreenDirective implements OnInit, OnDestroy {
  @Input('appIfScreen') config: { size: ScreenSize; type: 'eq' | 'lt' | 'le' | 'gt' | 'ge' };

  private _subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private screenSizeService: ScreenSizeService
  ) {}

  public ngOnInit(): void {
    this._subscription = this.screenSizeService.onResize().subscribe((size) => {
      let shouldRender = false;
      if (this.config.type === 'eq') {
        shouldRender = size === this.config.size;
      } else if (this.config.type === 'lt') {
        shouldRender = size < this.config.size;
      } else if (this.config.type === 'le') {
        shouldRender = size <= this.config.size;
      } else if (this.config.type === 'gt') {
        shouldRender = size > this.config.size;
      } else if (this.config.type === 'ge') {
        shouldRender = size >= this.config.size;
      }

      if (shouldRender) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
