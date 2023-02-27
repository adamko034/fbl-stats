import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfNotZero]'
})
export class IfNotZeroDirective {
  @Input('appIfNotZero') set value(value: number | null | undefined) {
    if (value === undefined || value === null || value === 0 || (!isNaN(value) && +value === 0)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
