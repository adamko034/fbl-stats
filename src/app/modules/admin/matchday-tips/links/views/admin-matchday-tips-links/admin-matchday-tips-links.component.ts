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
        this.displayedLinks.unshift({ ...res, isAdminNew: true, isNew: true, order: 0 });

        this.reorder();
        this.isChange = true;
        this.changeDetector.detectChanges();
      }
    });
  }

  public save(): void {
    const tipsLink: MatchdayTipsLink[] = this.displayedLinks.map((adminTip) => {
      const { title, url, order, isNew, imageUrl, description, source } = adminTip;
      return { title, url, order, isNew, imageUrl, description, source };
    });

    const tipsToSave: MatchdaysTipsLinks = { matchday: this.tips.matchday, links: tipsLink };
    this.service.save(tipsToSave).subscribe(() => {
      this.displayedLinks.forEach((l) => (l.isAdminNew = false));
      this.isChange = false;
      this.toastrService.success('Fantasy tip saved');
      this.changeDetector.detectChanges();
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
          return { ...l, isNew: l.isNew || false, isAdminNew: false };
        })
      ] || [];
  }

  private reorder() {
    this.displayedLinks = new ArrayStream<AdminMatchdayTipsLink>(this.displayedLinks).reorder().collect();
  }
}
