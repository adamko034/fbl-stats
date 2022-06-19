import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DropdownConfig } from '../models/dropdown-config.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() set config(val: DropdownConfig) {
    this._opened = val.opened;
    this._title = val.title;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }

  private _opened: boolean = false;
  public get opened(): boolean {
    return this._opened;
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public close() {
    this._opened = false;
    this.changeDetector.detectChanges();
  }

  public toggle() {
    this._opened = !this._opened;
    this.changeDetector.detectChanges();
  }
}
