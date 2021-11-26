import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsLink } from 'src/app/store/matchday-tips/links/models/matchday-tips-link.model';
import { MatchdaysTipsLinks } from 'src/app/store/matchday-tips/links/models/matchday-tips-links.model';
import { AdminMatchdayTipsLink } from '../../models/admin-matchday-tips-link.model';
import { AdminMatchdayTipsLinksService } from '../../services/admin-matchday-tips-links.service';
import { AdminMatchdayTipsNewLinkComponent } from './admin-matchday-tips-new-link/admin-matchday-tips-new-link.component';

@UntilDestroy()
@Component({
  selector: 'app-admin-matchday-tips-links',
  templateUrl: './admin-matchday-tips-links.component.html',
  styleUrls: ['./admin-matchday-tips-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMatchdayTipsLinksComponent implements OnInit {
  private tips: MatchdaysTipsLinks;

  public displayedLinks: AdminMatchdayTipsLink[];
  public isChange: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private service: AdminMatchdayTipsLinksService,
    private changeDetector: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.tips),
        untilDestroyed(this)
      )
      .subscribe((tips: MatchdaysTipsLinks) => {
        this.tips = tips;
        this.mapFantasyLinksToAdmin();
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.displayedLinks = new ArrayStream<AdminMatchdayTipsLink>(this.displayedLinks)
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
    const dialogRef = this.matDialog.open(AdminMatchdayTipsNewLinkComponent);

    dialogRef.afterClosed().subscribe((res: MatchdayTipsLink) => {
      if (!!res) {
        const { categories, title, url } = res;
        this.displayedLinks.unshift({ isAdminNew: true, isNew: true, categories, title, url, order: 0 });

        this.reorder();
        this.isChange = true;
        this.changeDetector.detectChanges();
      }
    });
  }

  public save(): void {
    const tipsLink: MatchdayTipsLink[] = this.displayedLinks.map((adminTip) => {
      const { categories, title, url, order, isNew } = adminTip;
      return { categories, title, url, order, isNew };
    });

    const tipsToSave: MatchdaysTipsLinks = { matchday: this.tips.matchday, links: tipsLink };
    this.service.save(tipsToSave).subscribe(() => {
      this.displayedLinks.forEach((l) => (l.isAdminNew = false));
      this.isChange = false;
      this.toastrService.success('Fantasy tip saved');
      this.changeDetector.detectChanges();
    });
  }

  public markAsNew(tip: MatchdayTipsLink): void {
    tip.isNew = !tip.isNew;
    this.isChange = true;
    this.changeDetector.detectChanges();
  }

  private mapFantasyLinksToAdmin() {
    if (!this.tips?.links) {
      this.displayedLinks = [];
      return;
    }

    this.displayedLinks =
      [
        ...this.tips.links.map((l) => {
          const { categories, title, url, order, isNew } = l;
          return { isNew: isNew || false, categories, title, url, order, isAdminNew: false };
        })
      ] || [];
  }

  private reorder() {
    this.displayedLinks = new ArrayStream<AdminMatchdayTipsLink>(this.displayedLinks).reorder().collect();
  }
}