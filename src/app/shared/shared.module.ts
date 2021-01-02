import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { PredictionIndicatorComponent } from 'src/app/shared/components/prediction-indicator/prediction-indicator.component';
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component';
import { TeamFormComponent } from 'src/app/shared/components/team-form/team-form.component';
import { TeamLogoSourceDirective } from 'src/app/shared/components/team-logo/directives/team-logo-source.directive';
import { TeamLogoStyleDirective } from 'src/app/shared/components/team-logo/directives/team-logo-style.directive';
import { TeamLogoComponent } from 'src/app/shared/components/team-logo/team-logo.component';
import { TimelineComponent } from 'src/app/shared/components/timeline/timeline.component';
import { ToggleExpandComponent } from 'src/app/shared/components/toggle-expand/toggle-expand.component';
import { MatInputAutofocusDirective } from 'src/app/shared/directives/mat-input-autofocus.directive';
import { SumByPipe } from 'src/app/shared/pipes/sum-by.pipe';

@NgModule({
  declarations: [
    TeamLogoComponent,
    TeamLogoSourceDirective,
    TeamLogoStyleDirective,
    SumByPipe,
    FormFieldComponent,
    PredictionIndicatorComponent,
    ToggleExpandComponent,
    TimelineComponent,
    TeamFormComponent,
    SwitchComponent,
    InputNumberComponent,
    MatInputAutofocusDirective
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    TeamLogoComponent,
    TeamLogoSourceDirective,
    TeamLogoStyleDirective,
    SumByPipe,
    FormFieldComponent,
    PredictionIndicatorComponent,
    ToggleExpandComponent,
    TimelineComponent,
    TeamFormComponent,
    SwitchComponent,
    InputNumberComponent,
    MatInputAutofocusDirective
  ]
})
export class SharedModule {}
