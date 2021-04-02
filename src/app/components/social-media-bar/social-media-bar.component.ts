import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social-media-bar',
  templateUrl: './social-media-bar.component.html',
  styleUrls: ['./social-media-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
