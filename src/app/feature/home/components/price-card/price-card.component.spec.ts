
import { PriceCardComponent } from './price-card.component';

describe('PriceCardComponent', () => {
  let component: PriceCardComponent;

  beforeAll(() => {
    component = new PriceCardComponent();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
