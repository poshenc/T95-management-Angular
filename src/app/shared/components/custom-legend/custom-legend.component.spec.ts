import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLegendComponent } from './custom-legend.component';

describe('CustomLegendComponent', () => {
  let component: CustomLegendComponent;
  let fixture: ComponentFixture<CustomLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLegendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
