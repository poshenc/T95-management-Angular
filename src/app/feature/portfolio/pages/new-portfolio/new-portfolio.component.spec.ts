import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPortfolioComponent } from './new-portfolio.component';

describe('NewPortfolioComponent', () => {
  let component: NewPortfolioComponent;
  let fixture: ComponentFixture<NewPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
