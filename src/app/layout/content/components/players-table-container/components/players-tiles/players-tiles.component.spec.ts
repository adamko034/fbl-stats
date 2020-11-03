import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTilesComponent } from './players-tiles.component';

describe('PlayersTilesComponent', () => {
  let component: PlayersTilesComponent;
  let fixture: ComponentFixture<PlayersTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
