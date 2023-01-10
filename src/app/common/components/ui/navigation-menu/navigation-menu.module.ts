import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { NavigationMenuComponent } from './navigation-menu.component';

@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, RouterModule, NgPipesModule, MatButtonModule, StickyModule],
  exports: [NavigationMenuComponent]
})
export class NavigationMenuModule {}
