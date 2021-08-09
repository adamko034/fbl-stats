import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FantasyTipLink } from 'src/app/store/tips/models/fantasy-tip-link.model';
import { FantasyTips } from 'src/app/store/tips/models/fantasy-tips.model';
import { AdminFantasyTip } from '../../tips/admin-fantasy-tip.model';
import { AdminFantasyTipsService } from '../../tips/admin-fantasy-tips.service';
import { AdminNewTipComponent } from './admin-new-tip/admin-new-tip.component';

@UntilDestroy()
@Component({
  selector: 'app-admin-tips',
  templateUrl: './admin-tips.component.html',
  styleUrls: ['./admin-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTipsComponent implements OnInit {
  private tips: FantasyTips;

  public displayedLinks: AdminFantasyTip[];
  public isChange: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private service: AdminFantasyTipsService,
    private changeDetector: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.tips),
        untilDestroyed(this)
      )
      .subscribe((tips: FantasyTips) => {
        this.tips = tips;
        this.mapFantasyLinksToAdmin();
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.displayedLinks = new ArrayStream<AdminFantasyTip>(this.displayedLinks)
      .moveItem(event.previousIndex, event.currentIndex)
      .reorder()
      .collect();

    this.isChange = true;
  }

  public onDelete(linkOrder: number): void {
    this.displayedLinks = this.displayedLinks.filter((l) => l.order != linkOrder);
    this.isChange = true;
  }

  public cancelChanges(): void {
    this.mapFantasyLinksToAdmin();
    this.isChange = false;
  }

  public openNewLinkDialog(): void {
    const dialogRef = this.matDialog.open(AdminNewTipComponent);

    dialogRef.afterClosed().subscribe((res: FantasyTipLink) => {
      if (!!res) {
        const { categories, title, url } = res;
        this.displayedLinks.unshift({ isNew: true, categories, title, url, order: 0 });

        this.reorder();
        this.isChange = true;
        this.changeDetector.detectChanges();
      }
    });
  }

  public save(): void {
    const tipsLink: FantasyTipLink[] = this.displayedLinks.map((adminTip) => {
      const { categories, title, url, order } = adminTip;
      return { categories, title, url, order };
    });

    const tipsToSave: FantasyTips = { matchday: this.tips.matchday, links: tipsLink };
    this.service.save(tipsToSave).subscribe(() => {
      this.displayedLinks.forEach((l) => (l.isNew = false));
      this.isChange = false;
    });
  }

  private mapFantasyLinksToAdmin() {
    if (!this.tips?.links) {
      this.displayedLinks = [];
      return;
    }

    this.displayedLinks =
      [
        ...this.tips.links.map((l) => {
          const { categories, title, url, order } = l;
          return { isNew: false, categories, title, url, order };
        })
      ] || [];
  }

  private reorder() {
    this.displayedLinks = new ArrayStream<AdminFantasyTip>(this.displayedLinks).reorder().collect();
  }
}
