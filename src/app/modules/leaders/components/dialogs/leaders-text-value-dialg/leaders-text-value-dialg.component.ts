import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';

@Component({
  selector: 'app-leaders-text-value-dialg',
  templateUrl: './leaders-text-value-dialg.component.html',
  styleUrls: ['./leaders-text-value-dialg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersTextValueDialgComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { values: TextValue[]; title: string }) {}
}
