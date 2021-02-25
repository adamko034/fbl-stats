import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@UntilDestroy()
@Directive({
  selector: '[appAuthenticated]'
})
export class AuthenticatedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) {
    this.viewContainer.clear();
  }

  public ngOnInit(): void {
    this.authService
      .isLogged()
      .pipe(
        map((res) => res.isLogged),
        untilDestroyed(this)
      )
      .subscribe((isLogged) => {
        isLogged ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
      });
  }
}
