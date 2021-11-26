import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';

@Component({
  selector: 'app-admin-matchday-tips-new-link',
  templateUrl: './admin-matchday-tips-new-link.component.html',
  styleUrls: ['./admin-matchday-tips-new-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMatchdayTipsNewLinkComponent implements OnInit {
  public form: FormGroup;
  public categories: string[] = [];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AdminMatchdayTipsNewLinkComponent>) {}

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
      const tip: MatchdayTipsLink = {
        title: this.form.get('title').value,
        url: this.form.get('url').value,
        categories: this.categories,
        order: 0,
        isNew: true
      };
      this.dialogRef.close(tip);
    }
  }
}
