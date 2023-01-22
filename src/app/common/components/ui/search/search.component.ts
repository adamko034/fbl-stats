import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() set value(newValue: string) {
    if (newValue && newValue !== '') {
      this.search.setValue(newValue);
    }
  }
  @Input() placeholder: string;
  @Input() label: string;
  @Output() termChange = new EventEmitter<string>();

  public search = new FormControl();

  constructor() {}

  public ngOnInit(): void {
    this.search.valueChanges.pipe(distinctUntilChanged(), untilDestroyed(this)).subscribe((value) => {
      this.termChange.emit(value);
    });
  }

  public clear(): void {
    this.search.reset();
  }
}
