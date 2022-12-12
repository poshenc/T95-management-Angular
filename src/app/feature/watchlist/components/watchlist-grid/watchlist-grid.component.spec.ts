import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistGridComponent } from './watchlist-grid.component';

describe('WatchlistGridComponent', () => {
  let component: WatchlistGridComponent;
  let fixture: ComponentFixture<WatchlistGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlistGridComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WatchlistGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
