import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { AdminBestgksRoutingModule } from './admin-bestgks-routing.module';
import { AdminBestGksFacade } from './admin-bestgks.facade';
import { AdminBestGksSaverServer } from './logic/services/admin-best-gks-saver.service';
import { AdminBestGksStateLoader } from './logic/services/admin-best-gks-state.loader';
import { AdminBestGksResolver } from './routing/admin-best-gks.resolver';
import { AdminBestGksComponent } from './views/admin-best-gks.component';

@NgModule({
  declarations: [AdminBestGksComponent],
  imports: [
    CommonModule,
    AdminBestgksRoutingModule,
    SharedModule,
    FblCoreModule,
    AngularMaterialModule,
    PlayerNameLinkModule,
    TeamLogoModule
  ],
  providers: [AdminBestGksFacade, AdminBestGksStateLoader, AdminBestGksResolver, AdminBestGksSaverServer]
})
export class AdminBestgksModule {}
