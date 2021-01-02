import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({ selector: 'matInputAutofocus' })
export class MatInputAutofocusDirective implements OnInit {
  constructor(private matInput: MatInput) {}

  public ngOnInit() {
    this.matInput.focus();
  }
}
