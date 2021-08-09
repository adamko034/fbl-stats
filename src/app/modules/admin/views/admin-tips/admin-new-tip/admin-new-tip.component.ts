import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FantasyTipLink } from 'src/app/store/tips/models/fantasy-tip-link.model';

@Component({
  selector: 'app-admin-new-tip',
  templateUrl: './admin-new-tip.component.html',
  styleUrls: ['./admin-new-tip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewTipComponent implements OnInit {
  public form: FormGroup;
  public categories: string[] = [];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AdminNewTipComponent>) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      url: [''],
      newCategory: ['']
    });
  }

  public addCategory(): void {
    this.categories.push(this.form.get('newCategory').value);
    this.form.get('newCategory').setValue('');
  }

  public removeCategory(category: string): void {
    this.categories = this.categories.filter((x) => x !== category);
  }

  public submit(): void {
    if (this.form.valid) {
      const tip: FantasyTipLink = {
        title: this.form.get('title').value,
        url: this.form.get('url').value,
        categories: this.categories,
        order: 0
      };
      this.dialogRef.close(tip);
    }
  }
}
