import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistHeaderComponent } from './watchlist-header.component';

describe('WatchlistHeaderComponent', () => {
  let component: WatchlistHeaderComponent;
  let fixture: ComponentFixture<WatchlistHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
