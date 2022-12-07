import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LinkPreviewService } from 'src/app/modules/admin/services/link-preview.service';
import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';

@UntilDestroy()
@Component({
  selector: 'app-admin-matchday-tips-new-link',
  templateUrl: './admin-matchday-tips-new-link.component.html',
  styleUrls: ['./admin-matchday-tips-new-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMatchdayTipsNewLinkComponent implements OnInit {
  public linkLoading = false;
  public form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AdminMatchdayTipsNewLinkComponent>,
    private linkPreviewService: LinkPreviewService,
    private changeDetection: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      url: [''],
      description: [''],
      imageUrl: [''],
      host: ['']
    });
  }

  public getLinkPreview() {
    if (!this.form.get('url').value) {
      return;
    }

    this.linkLoading = true;
    this.changeDetection.detectChanges();

    this.linkPreviewService
      .getLinkPreview(this.form.get('url').value)
      .pipe(untilDestroyed(this))
      .subscribe((link) => {
        if (link) {
          this.form.get('title').setValue(link.title);
          this.form.get('description').setValue(link.description);
          this.form.get('imageUrl').setValue(link.image);
          this.form.get('host').setValue(new URL(link.url).hostname);

          this.linkLoading = false;
        }
      });
  }

  public submit(): void {
    if (this.form.valid) {
      const link: MatchdayTipsLink = {
        title: this.form.get('title').value,
        url: this.form.get('url').value,
        description: this.form.get('description').value,
        imageUrl: this.form.get('imageUrl').value,
        source: this.form.get('host').value,
        order: 0,
        isNew: true
      };
      this.dialogRef.close(link);
    }
  }

  public submitDisabled(): boolean {
    return !this.form.valid;
  }
}
