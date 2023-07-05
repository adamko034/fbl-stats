import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Injectable()
export class PageTitleGuard implements CanActivate {
  constructor(private guiConfigStore: GuiConfigStore) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.guiConfigStore.changePageTitle(route.data['pageTitle']);
    return true;
  }
}
