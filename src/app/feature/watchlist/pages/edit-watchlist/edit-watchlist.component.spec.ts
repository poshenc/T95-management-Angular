import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWatchlistComponent } from './edit-watchlist.component';

describe('EditWatchlistComponent', () => {
  let component: EditWatchlistComponent;
  let fixture: ComponentFixture<EditWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWatchlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
